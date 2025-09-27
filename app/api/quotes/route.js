// app/api/quotes/route.js - Quotes API
import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import QuoteRequest from '@/lib/models/QuoteRequest';
import Plot from '@/lib/models/Plot';
import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationToken, validatePhoneNumber } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    const quotes = await QuoteRequest.find()
      .populate('plotIds', 'plotNumber projectId price')
      .sort({ createdAt: -1 });
      
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quote requests' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { customerName, email, phone, message, plotIds, honeypot } = body;
    
    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }
    
    // Validate message length
    if (!message || message.trim().length < 20) {
      return NextResponse.json(
        { error: 'Message must be at least 20 characters long' },
        { status: 400 }
      );
    }
    
    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid international phone number (e.g., +254712345678)' },
        { status: 400 }
      );
    }
    
    // Check if plots are available
    const plots = await Plot.find({ 
      _id: { $in: plotIds }, 
      status: { $in: ['available', 'requested'] }
    });
    
    if (plots.length !== plotIds.length) {
      return NextResponse.json(
        { error: 'Some selected plots are no longer available' },
        { status: 400 }
      );
    }
    
    // Calculate total price
    const totalPrice = plots.reduce((sum, plot) => sum + plot.price, 0);
    
    // Generate verification token
    const verificationToken = generateVerificationToken();
    
    // Set expiry date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    // Create quote request
    const quoteRequest = new QuoteRequest({
      customerName,
      email,
      phone,
      message,
      plotIds,
      totalPrice,
      verificationToken,
      expiresAt
    });
    
    await quoteRequest.save();
    
    // Update plot statuses to 'requested'
    await Plot.updateMany(
      { _id: { $in: plotIds } },
      { status: 'requested' }
    );
    
    // Send verification email to customer
    await sendVerificationEmail(email, customerName, verificationToken);
    
    return NextResponse.json({
      message: 'Quote request submitted successfully. Please check your email to verify.',
      quoteId: quoteRequest._id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}