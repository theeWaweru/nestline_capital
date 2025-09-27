// lib/models/Plot.js - Plot Model
import mongoose from 'mongoose';

const PlotSchema = new mongoose.Schema({
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project',
    required: true 
  },
  plotNumber: { type: Number, required: true },
  plotId: { type: String, required: true, unique: true }, // e.g., "GF001"
  
  // Location details
  block: { type: String, required: true }, // e.g., "Block A"
  row: { type: String, required: true }, // e.g., "Row 1"
  location: { type: String, required: true }, // Combined: "Block A, Row 1"
  
  // Plot specifications
  sizeInAcres: { type: Number, required: true }, // 0.5, 0.75, 1, etc.
  sizeInFeet: { type: String, default: '50x100 feet' },
  price: { type: Number, required: true },
  pricePerAcre: { type: Number, required: true },
  
  // Geographic data
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  
  // Media and documentation
  images: [{ type: String }], // Cloudinary URLs
  documents: [{ type: String }], // Title deed, survey docs
  description: { type: String, default: '' },
  
  // Status and availability
  status: { 
    type: String, 
    enum: ['available', 'requested', 'confirmed', 'sold'],
    default: 'available'
  },
  
  // Hold/reservation tracking
  holdExpiry: { type: Date },
  holdDays: { type: Number, default: 7 },
  
  // Sales metrics
  listedDate: { type: Date, default: Date.now },
  soldDate: { type: Date },
  daysToSale: { type: Number },
  
  // Customer tracking (for holds/sales)
  currentCustomer: {
    name: { type: String },
    email: { type: String },
    phone: { type: String }
  }
}, { timestamps: true });

// Compound index for unique plot numbers within projects
PlotSchema.index({ projectId: 1, plotNumber: 1 }, { unique: true });
PlotSchema.index({ plotId: 1 }, { unique: true });
PlotSchema.index({ coordinates: '2d' }); // For geospatial queries

// Calculate days to sale when status changes to sold
PlotSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'sold' && !this.soldDate) {
    this.soldDate = new Date();
    this.daysToSale = Math.ceil((this.soldDate - this.listedDate) / (1000 * 60 * 60 * 24));
  }
  
  // Set hold expiry when status changes to requested
  if (this.isModified('status') && this.status === 'requested' && !this.holdExpiry) {
    this.holdExpiry = new Date(Date.now() + (this.holdDays * 24 * 60 * 60 * 1000));
  }
  
  next();
});

export default mongoose.models.Plot || mongoose.model('Plot', PlotSchema);