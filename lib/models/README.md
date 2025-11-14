# Database Models - Nestline Capital

This document describes all database models and their relationships.

## Models Overview

### 1. User Model (`User.js`)
Manages user authentication, roles, and profiles.

**Fields:**
- `name`, `email`, `password`
- `role`: admin, editor, user
- `phone`, `avatar`
- `emailVerified`, verification tokens
- `resetPasswordToken`, password reset tokens
- `lastLogin`, timestamps

**Relationships:**
- Has many: Bookings (as investor)
- Has many: Payments (as investor)
- Has many: Plots (as creator)
- Has many: Projects (as creator)

---

### 2. Project Model (`Project.js`)
Represents real estate development projects.

**Fields:**
- `name`, `slug`, `location`
- `totalLandSize`, `description`
- `images[]`, `status`, `visibility`
- `createdBy` (User reference)
- Timestamps

**Relationships:**
- Has many: Plots
- Has many: Bookings
- Belongs to: User (creator)

---

### 3. Plot Model (`Plot.js`)
Individual land plots within projects.

**Fields:**
- `plotNumber`, `size`, `price`
- `images[]`, `titleDeed`
- `coordinates` (4 GPS corners)
- `features`, `amenities`, `infrastructure`
- `topography`, `soilType`, `developmentStatus`
- `status`: draft, available, processing, booked
- `visibility` (boolean)
- `bookedBy` (User reference)
- `bookingDate`
- `project` (Project reference)
- `createdBy` (User reference)

**Relationships:**
- Belongs to: Project
- Belongs to: User (bookedBy)
- Belongs to: User (creator)
- Has one: Booking (active)
- Has many: Payments (through Booking)

---

### 4. Booking Model (`Booking.js`) ⭐ NEW
Tracks plot bookings and payment plans.

**Fields:**
- `bookingNumber` (auto-generated: BK2411XXXX)
- `plot` (Plot reference)
- `investor` (User reference)
- `project` (Project reference)
- `bookingStatus`: pending, confirmed, cancelled, completed
- `paymentPlan`: full, installment
- `totalAmount`, `amountPaid`, `amountRemaining`
- `installmentPlan`:
  - `numberOfInstallments`
  - `installmentAmount`
  - `frequency`: weekly, bi-weekly, monthly, quarterly
  - `startDate`, `nextPaymentDue`
- `confirmedAt`, `confirmedBy`
- `cancelledAt`, `cancelledBy`, `cancellationReason`
- `completedAt`
- `investorNotes`, `adminNotes`
- `createdBy`, `lastModifiedBy`
- Timestamps

**Virtuals:**
- `isFullyPaid`: boolean
- `paymentProgress`: percentage (0-100)

**Methods:**
- `confirmBooking(adminId)`
- `cancelBooking(adminId, reason)`
- `completeBooking()`

**Relationships:**
- Belongs to: Plot
- Belongs to: User (investor)
- Belongs to: Project
- Has many: Payments

**Indexes:**
- `(investor, bookingStatus)`
- `(plot, bookingStatus)`
- `(project, bookingStatus)`
- `createdAt` (descending)

---

### 5. Payment Model (`Payment.js`) ⭐ NEW
Tracks payment screenshot submissions and admin verification.

**Fields:**
- `paymentNumber` (auto-generated: PAY2411XXXX)
- `booking` (Booking reference)
- `investor` (User reference)
- `plot` (Plot reference)
- `amount`
- `paymentMethod`: bank-transfer, mpesa, cash, cheque, card, paypal, other
- `transactionReference`
- `screenshots[]`:
  - `url`, `fileName`, `uploadedAt`, `fileSize`
- `paymentStatus`: pending, verified, rejected
- `verifiedBy`, `verifiedAt`
- `rejectedBy`, `rejectedAt`, `rejectionReason`
- `paymentDate`, `depositedBy`
- `depositedTo`:
  - `accountName`, `accountNumber`, `bankName`
- `investorNotes`, `adminNotes`, `verificationNotes`
- `isInstallment`, `installmentNumber`, `totalInstallments`
- `receiptGenerated`, `receiptUrl`, `receiptNumber`
- `submittedBy`, `lastModifiedBy`
- Timestamps

**Virtuals:**
- `daysSinceSubmission`: number of days
- `statusDisplay`: user-friendly status text

**Methods:**
- `verifyPayment(adminId, notes)`
- `rejectPayment(adminId, reason, notes)`
- `isVerified()`
- `isPending()`

**Relationships:**
- Belongs to: Booking
- Belongs to: User (investor)
- Belongs to: Plot

**Indexes:**
- `(booking, paymentStatus)`
- `(investor, paymentStatus)`
- `paymentDate` (descending)
- `createdAt` (descending)
- `(paymentStatus, createdAt)` (compound)

---

## Relationship Diagram

```
User (Investor)
  └─ has many ─> Bookings
                  └─ belongs to ─> Plot
                  └─ belongs to ─> Project
                  └─ has many ─> Payments
                                  └─ references ─> Plot

Project
  └─ has many ─> Plots
  └─ has many ─> Bookings

Plot
  └─ belongs to ─> Project
  └─ belongs to ─> User (bookedBy)
  └─ has one ─> Booking (active)
  └─ has many ─> Payments (through Booking)
```

---

## Workflow: Booking & Payment Process

### 1. User Browses Plots
- Views available plots (status: "available", visibility: true)
- Selects a plot to book

### 2. Create Booking
```javascript
const booking = new Booking({
  plot: plotId,
  investor: userId,
  project: projectId,
  paymentPlan: "installment", // or "full"
  totalAmount: plotPrice,
  installmentPlan: {
    numberOfInstallments: 12,
    installmentAmount: plotPrice / 12,
    frequency: "monthly",
    startDate: new Date(),
  },
  createdBy: userId,
});
await booking.save();
// Auto-generates: bookingNumber (e.g., BK241101)
```

### 3. User Makes Payment
- User transfers money to company account
- User uploads payment screenshot

```javascript
const payment = new Payment({
  booking: bookingId,
  investor: userId,
  plot: plotId,
  amount: installmentAmount,
  paymentMethod: "bank-transfer",
  transactionReference: "TXN123456",
  screenshots: [{ url: screenshotUrl, fileName: "receipt.jpg" }],
  paymentDate: new Date(),
  depositedBy: "John Doe",
  isInstallment: true,
  installmentNumber: 1,
  totalInstallments: 12,
  investorNotes: "First payment for Plot A-101",
  submittedBy: userId,
});
await payment.save();
// Auto-generates: paymentNumber (e.g., PAY241101)
```

### 4. Admin Reviews Payment
**Pending Tab:**
- Admin sees all payments with status: "pending"
- Views payment screenshots
- Checks transaction reference

**Verify Payment:**
```javascript
payment.verifyPayment(adminId, "Payment confirmed with bank");
await payment.save();

// Update booking amount paid
booking.amountPaid += payment.amount;
await booking.save();

// If fully paid, update plot status
if (booking.isFullyPaid) {
  booking.completeBooking();
  await booking.save();

  plot.status = "booked";
  plot.bookedBy = booking.investor;
  plot.bookingDate = new Date();
  await plot.save();
}
```

**Or Reject Payment:**
```javascript
payment.rejectPayment(
  adminId,
  "Transaction reference not found",
  "Please verify transaction details and resubmit"
);
await payment.save();
```

### 5. Track Payment Progress
```javascript
const booking = await Booking.findById(bookingId);
console.log(booking.paymentProgress); // e.g., 75 (means 75% paid)
console.log(booking.isFullyPaid); // false
console.log(booking.amountRemaining); // e.g., 250000
```

---

## Query Examples

### Get all pending payments for admin review
```javascript
const pendingPayments = await Payment.find({ paymentStatus: "pending" })
  .populate("investor", "name email")
  .populate("plot", "plotNumber")
  .populate("booking", "bookingNumber totalAmount")
  .sort({ createdAt: -1 });
```

### Get investor's bookings with payment history
```javascript
const bookings = await Booking.find({ investor: userId })
  .populate("plot", "plotNumber size price images")
  .populate("project", "name location")
  .sort({ createdAt: -1 });

const payments = await Payment.find({ investor: userId })
  .populate("booking", "bookingNumber")
  .sort({ createdAt: -1 });
```

### Get booking with all payments
```javascript
const booking = await Booking.findById(bookingId)
  .populate("plot")
  .populate("investor", "name email phone")
  .populate("project");

const payments = await Payment.find({ booking: bookingId })
  .sort({ createdAt: -1 });
```

### Admin dashboard stats
```javascript
// Total bookings by status
const bookingStats = await Booking.aggregate([
  { $group: { _id: "$bookingStatus", count: { $sum: 1 } } },
]);

// Pending payments count
const pendingCount = await Payment.countDocuments({ paymentStatus: "pending" });

// Total revenue (verified payments)
const revenue = await Payment.aggregate([
  { $match: { paymentStatus: "verified" } },
  { $group: { _id: null, total: { $sum: "$amount" } } },
]);
```

---

## Auto-generated Fields

### Booking Number Format
- **Pattern:** `BK[YY][MM][XXXX]`
- **Example:** `BK2411001` (1st booking in November 2024)

### Payment Number Format
- **Pattern:** `PAY[YY][MM][XXXX]`
- **Example:** `PAY2411001` (1st payment in November 2024)

Both are auto-generated on model creation using pre-save hooks.

---

## Validation Rules

### Booking
- Plot, investor, project are required
- Payment plan must be "full" or "installment"
- Total amount must be >= 0
- Amount paid must be >= 0
- Amount remaining is auto-calculated

### Payment
- Booking, investor, plot are required
- Amount must be > 0
- Payment method is required
- At least one screenshot is required
- Payment date is required
- Deposited by name is required

---

## Best Practices

1. **Always use transactions** for payment verification to ensure data consistency:
```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  payment.verifyPayment(adminId);
  await payment.save({ session });

  booking.amountPaid += payment.amount;
  await booking.save({ session });

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

2. **Populate references** for better UX
3. **Use indexes** for efficient queries
4. **Validate data** on both client and server
5. **Track modifications** using `lastModifiedBy` field

---

## Migration Notes

When implementing these models in your application:

1. Ensure MongoDB connection is established
2. Models are auto-registered on first use
3. Indexes are created automatically
4. Pre-save hooks run before every save operation
5. Virtual fields are included in JSON/Object conversions

---

**Created:** Phase 2 - Database Foundation
**Last Updated:** November 2024
