# Nestline Capital - Strategic Implementation Order

**Created:** November 13, 2025
**Branch:** claude/audit-codebase-checklist-011CV5yXUvpbUJwty8cEsnbR
**Estimated Timeline:** 8-10 weeks for complete Phase 4

---

## Philosophy & Approach

This implementation plan follows the principle of **"Build the foundation, then the house"**:

1. **Quick wins first** - Deliver immediate value and fix critical gaps
2. **Foundation before features** - Data models and APIs before UI
3. **Critical path priority** - Focus on revenue-generating features
4. **Incremental delivery** - Each phase delivers working functionality
5. **Risk mitigation** - Address blockers early

---

## Phase 1: Quick Wins & Critical Fixes (Week 1 - Days 1-3)
**Goal:** Fix immediate issues and improve developer experience
**Estimated Time:** 2-3 days
**Delivers:** Better DX, fixes broken links, documentation

### 1.1 Environment Documentation (2 hours)
**Priority:** 🔴 CRITICAL - Blocks new developers

- [ ] Create `.env.example` file with all required variables
- [ ] Document MongoDB setup requirements
- [ ] Document AWS S3 bucket setup
- [ ] Document Google Maps API requirements
- [ ] Document email service configuration
- [ ] Add setup instructions to README.md

**Rationale:** Anyone trying to set up the project is currently blocked. This is the #1 developer experience issue.

**Dependencies:** None
**Risk:** None
**Deliverable:** Complete environment documentation

---

### 1.2 Missing Error Pages (2 hours)
**Priority:** 🟡 HIGH - Fixes broken redirects

- [ ] Create `/app/unauthorized/page.js` (middleware redirects here)
- [ ] Create `/app/error/page.js` (generic error page)
- [ ] Create `/app/not-found.js` (404 page)
- [ ] Test middleware redirects

**Rationale:** Middleware currently redirects to `/unauthorized` which doesn't exist, causing errors.

**Dependencies:** None
**Risk:** Low
**Deliverable:** Proper error handling for unauthorized access

---

### 1.3 Basic User Profile Pages (1 day)
**Priority:** 🟡 HIGH - Completes user experience

- [ ] Create `/app/dashboard/profile/page.js`
  - User profile view and edit form
  - Password change functionality
  - Avatar upload
  - Phone number update
- [ ] Create API route `/api/users/profile` (GET, PUT)
- [ ] Create API route `/api/users/profile/password` (PUT)
- [ ] Test profile update workflow

**Rationale:** Users can see their dashboard but can't edit their profile. Quick to implement with existing components.

**Dependencies:** None (uses existing UserProfileForm component)
**Risk:** Low
**Deliverable:** Users can manage their profiles

---

## Phase 2: Database Foundation (Week 1 - Days 4-5)
**Goal:** Create data models that Phase 4 features depend on
**Estimated Time:** 2 days
**Delivers:** Database schema for bookings and payments

### 2.1 Booking Model (4 hours)
**Priority:** 🔴 CRITICAL - Blocks all Phase 4 features

```javascript
// /models/Booking.js
- bookingId (auto-generated, unique)
- plot (reference to Plot)
- user (reference to User)
- bookingDate
- status (pending/payment_pending/paid/completed/cancelled)
- totalAmount
- paymentStatus
- paymentMethod
- notes
- statusHistory (track status changes)
- createdBy (admin reference)
- timestamps
```

**Rationale:** Everything in Phase 4 depends on the Booking model. Must be done first.

**Dependencies:** None
**Risk:** Low (similar to existing models)
**Deliverable:** Booking model ready for use

---

### 2.2 Payment Model (4 hours)
**Priority:** 🔴 CRITICAL - Blocks payment features

```javascript
// /models/Payment.js
- paymentId (auto-generated, unique)
- booking (reference to Booking)
- user (reference to User)
- amount
- currency (default: KES)
- paymentMethod (mpesa/card/bank_transfer)
- transactionId
- providerReference
- status (initiated/pending/completed/failed/refunded)
- paymentDate
- verificationDate
- verifiedBy (admin reference)
- metadata (provider-specific data)
- receiptUrl
- timestamps
```

**Rationale:** Needed for payment tracking and verification.

**Dependencies:** Booking model
**Risk:** Low
**Deliverable:** Payment model ready for use

---

### 2.3 Model Relationships & Validations (2 hours)
**Priority:** 🔴 CRITICAL

- [ ] Update Plot model to include booking reference
- [ ] Add validation: plot can't be booked twice
- [ ] Add validation: booking requires available plot
- [ ] Add indexes for performance
- [ ] Test model relationships
- [ ] Create database migration/seed scripts if needed

**Rationale:** Ensure data integrity before building features.

**Dependencies:** Booking and Payment models
**Risk:** Medium (must get relationships right)
**Deliverable:** Validated database schema

---

## Phase 3: Booking API Layer (Week 2)
**Goal:** Create API routes for booking operations
**Estimated Time:** 4-5 days
**Delivers:** Complete booking API functionality

### 3.1 Admin Booking APIs (2 days)
**Priority:** 🔴 CRITICAL - Enables admin booking management

- [ ] `GET /api/admin/bookings` - List all bookings with filters
  - Filter by status, date range, plot, user
  - Pagination support
  - Search by user name/email
- [ ] `POST /api/admin/bookings` - Create new booking
  - Validate plot availability
  - Create booking record
  - Update plot status to "processing"
  - Send confirmation email
- [ ] `GET /api/admin/bookings/[id]` - Get booking details
  - Include plot details
  - Include user details
  - Include payment history
- [ ] `PUT /api/admin/bookings/[id]` - Update booking
  - Allow status changes
  - Track status history
  - Send status update emails
- [ ] `DELETE /api/admin/bookings/[id]` - Cancel booking
  - Validate cancellation allowed
  - Update plot status back to "available"
  - Handle refund if needed
- [ ] `GET /api/admin/bookings/stats` - Booking statistics
  - Total bookings by status
  - Revenue metrics
  - Recent bookings

**Rationale:** Admin needs to manage bookings before anyone else can use them.

**Dependencies:** Booking model
**Risk:** Medium (business logic complexity)
**Deliverable:** Complete admin booking API

---

### 3.2 Payment Verification APIs (1 day)
**Priority:** 🔴 CRITICAL - Enables payment processing

- [ ] `POST /api/admin/bookings/[id]/verify-payment` - Verify payment
  - Upload proof of payment
  - Update booking status
  - Update payment status
  - Send confirmation to user
  - Update plot status to "booked"
- [ ] `GET /api/admin/bookings/[id]/payments` - Get payment history
  - List all payments for booking
  - Include verification details
- [ ] `POST /api/admin/bookings/[id]/refund` - Process refund
  - Validate refund conditions
  - Create refund record
  - Update booking status

**Rationale:** Manual payment verification before automated payment integration.

**Dependencies:** Booking APIs, Payment model
**Risk:** Medium (financial operations)
**Deliverable:** Manual payment verification system

---

### 3.3 User Booking APIs (1 day)
**Priority:** 🟡 HIGH - Enables user self-service

- [ ] `GET /api/bookings` - User's own bookings
  - List user's bookings only
  - Include plot details
  - Include payment status
- [ ] `GET /api/bookings/[id]` - User's booking details
  - Full booking information
  - Payment history
  - Title deed access if completed
- [ ] `POST /api/bookings/request` - Request booking (quote flow)
  - Create booking request
  - Send to admin for review
  - Email user confirmation

**Rationale:** Users need to view their bookings and request new ones.

**Dependencies:** Booking model, Admin APIs (reference)
**Risk:** Low
**Deliverable:** User booking API

---

### 3.4 API Testing & Validation (0.5 days)
**Priority:** 🟡 HIGH - Quality assurance

- [ ] Test all booking CRUD operations
- [ ] Test payment verification flow
- [ ] Test error cases (duplicate bookings, invalid plots)
- [ ] Test authorization (users can't see other's bookings)
- [ ] Test email notifications
- [ ] Document API endpoints

**Rationale:** Ensure APIs work correctly before building UI.

**Dependencies:** All Phase 3 APIs
**Risk:** Low
**Deliverable:** Tested and documented APIs

---

## Phase 4: Admin Booking Interface (Week 3-4)
**Goal:** Build UI for admin booking management
**Estimated Time:** 7-10 days
**Delivers:** Complete admin booking functionality

### 4.1 Admin Bookings Page - List View (2 days)
**Priority:** 🔴 CRITICAL - Main admin interface

- [ ] Remove placeholder from `/app/admin/bookings/page.js`
- [ ] Implement booking list table
  - Columns: ID, Plot, User, Date, Amount, Status, Actions
  - Status badges (color-coded)
  - Sorting by date, amount, status
- [ ] Add filters component
  - Filter by status
  - Filter by date range
  - Filter by plot/project
  - Search by user name/email
- [ ] Add pagination
- [ ] Add "Create Booking" button
- [ ] Add stats cards
  - Total bookings
  - Pending payments
  - Completed bookings
  - Total revenue
- [ ] Test list view functionality

**Rationale:** Primary interface for admin to see all bookings at a glance.

**Dependencies:** Booking APIs
**Risk:** Low (similar to existing plot/project pages)
**Deliverable:** Working booking list page

---

### 4.2 Create Booking Flow (2 days)
**Priority:** 🔴 CRITICAL - Core business function

- [ ] Create `/app/admin/bookings/new/page.js`
- [ ] Build multi-step booking form
  - Step 1: Select plot (with search and filters)
  - Step 2: Select/create user
  - Step 3: Booking details (price, notes)
  - Step 4: Review and confirm
- [ ] Add plot availability validation
- [ ] Add price calculation
- [ ] Show plot details and images
- [ ] Integration with booking creation API
- [ ] Success confirmation with booking details
- [ ] Send confirmation email to user
- [ ] Test booking creation flow

**Rationale:** Admin needs to create bookings for customers.

**Dependencies:** Booking APIs, existing MultiStepForm component
**Risk:** Medium (complex form with validation)
**Deliverable:** Working booking creation

---

### 4.3 Booking Details & Management (2 days)
**Priority:** 🔴 CRITICAL - View and manage individual bookings

- [ ] Create `/app/admin/bookings/[id]/page.js`
- [ ] Display comprehensive booking information
  - Booking summary card
  - Plot details with images
  - User information
  - Payment status
  - Status history timeline
- [ ] Add payment verification section
  - Upload payment proof
  - Enter payment details
  - Verify payment button
  - Payment history list
- [ ] Add status management
  - Change status dropdown
  - Status change confirmation
  - Status history tracking
- [ ] Add actions
  - Edit booking button
  - Cancel booking button
  - Send email to user button
  - Print/export booking details
- [ ] Test all actions

**Rationale:** Admin needs detailed view to manage individual bookings.

**Dependencies:** Booking APIs, Payment APIs
**Risk:** Low
**Deliverable:** Complete booking detail page

---

### 4.4 Payment Verification UI (1 day)
**Priority:** 🔴 CRITICAL - Core business process

- [ ] Create payment verification modal/dialog
- [ ] Add proof of payment upload
  - Image upload for receipts
  - M-Pesa transaction ID input
  - Bank transfer reference input
- [ ] Add verification form
  - Amount received
  - Payment date
  - Payment method
  - Verification notes
- [ ] Confirmation workflow
  - Review payment details
  - Confirm verification
  - Update booking status
  - Send confirmation email
- [ ] Show payment history
  - List all payments for booking
  - Show verification details
  - Show verifier information
- [ ] Test payment verification flow

**Rationale:** Critical for converting bookings to confirmed purchases.

**Dependencies:** Payment verification API
**Risk:** Medium (financial operation)
**Deliverable:** Working payment verification

---

### 4.5 Booking Edit & Cancel (1 day)
**Priority:** 🟡 HIGH - Admin flexibility

- [ ] Create `/app/admin/bookings/[id]/edit/page.js`
- [ ] Allow editing booking details
  - Update notes
  - Adjust price (with approval)
  - Change payment method
- [ ] Cancel booking functionality
  - Confirmation dialog
  - Cancellation reason
  - Automatic plot status update
  - Refund handling if needed
  - Cancellation email to user
- [ ] Validation and guards
  - Can't edit completed bookings (only notes)
  - Can't cancel after title deed issued
- [ ] Test edit and cancel flows

**Rationale:** Admin needs flexibility to handle edge cases.

**Dependencies:** Booking update API
**Risk:** Medium (business logic)
**Deliverable:** Booking edit and cancel functionality

---

### 4.6 Booking Analytics & Reports (1 day)
**Priority:** 🟢 MEDIUM - Business insights

- [ ] Add booking analytics component
  - Bookings over time chart
  - Revenue over time chart
  - Status distribution pie chart
  - Average booking value
- [ ] Add export functionality
  - Export bookings to CSV
  - Export payments to CSV
  - Date range selection
- [ ] Add filtering to analytics
  - By date range
  - By project
  - By status
- [ ] Test analytics and exports

**Rationale:** Admin needs business insights and reporting.

**Dependencies:** Booking stats API
**Risk:** Low
**Deliverable:** Booking analytics dashboard

---

## Phase 5: Investor Management (Week 5)
**Goal:** Build investor portfolio tracking
**Estimated Time:** 5-7 days
**Delivers:** Complete investor management interface

### 5.1 Investor Dashboard - Overview (2 days)
**Priority:** 🟡 HIGH - Business intelligence

- [ ] Remove placeholder from `/app/admin/investors/page.js`
- [ ] Implement investor list view
  - Table with: Name, Email, Phone, Total Plots, Total Investment, Status
  - Search by name/email
  - Filter by investment status
  - Sort by plots, investment amount
- [ ] Add investor stats cards
  - Total investors
  - Total plots sold
  - Total revenue
  - Average investment
- [ ] Add quick actions
  - View investor details
  - Email investor
  - Export investor list
- [ ] Implement pagination
- [ ] Test investor list

**Rationale:** Admin needs overview of all investors and their investments.

**Dependencies:** Booking data (queries bookings by user)
**Risk:** Low (aggregation of existing data)
**Deliverable:** Investor list page

---

### 5.2 Investor Portfolio View (2 days)
**Priority:** 🟡 HIGH - Investor management

- [ ] Create `/app/admin/investors/[id]/page.js`
- [ ] Display investor profile
  - Contact information
  - Registration date
  - Total investment
  - Number of plots owned
- [ ] Show investor's plots
  - List all plots with details
  - Plot status
  - Payment status
  - Title deed status
- [ ] Show payment history
  - All payments made
  - Payment dates and amounts
  - Outstanding payments
- [ ] Show documents
  - Title deeds access
  - Payment receipts
  - Booking agreements
- [ ] Add investor actions
  - Email investor
  - Add note about investor
  - Flag for follow-up
- [ ] Test investor portfolio view

**Rationale:** Admin needs complete view of each investor's portfolio.

**Dependencies:** Booking APIs, User profile data
**Risk:** Low
**Deliverable:** Investor detail page

---

### 5.3 Investor Analytics (1 day)
**Priority:** 🟢 MEDIUM - Business insights

- [ ] Create investor analytics dashboard
  - New investors over time
  - Repeat investors tracking
  - Average plots per investor
  - Investment distribution chart
- [ ] Add investor segmentation
  - By investment size
  - By number of plots
  - By location preference
- [ ] Export analytics data
- [ ] Test analytics

**Rationale:** Business needs investor insights for marketing and strategy.

**Dependencies:** Investor data aggregation
**Risk:** Low
**Deliverable:** Investor analytics

---

## Phase 6: User-Facing Features (Week 6)
**Goal:** Complete user dashboard functionality
**Estimated Time:** 3-5 days
**Delivers:** Full user self-service capabilities

### 6.1 User Booking History Page (2 days)
**Priority:** 🟡 HIGH - User transparency

- [ ] Create `/app/dashboard/bookings/page.js`
- [ ] Display user's bookings list
  - Card-based layout (more user-friendly than table)
  - Show plot image, details, status
  - Payment status badges
  - Booking date
- [ ] Add booking detail view
  - Click to expand/modal
  - Full plot information
  - Payment history
  - Download title deed (if completed)
- [ ] Add filters
  - Filter by status
  - Filter by payment status
  - Sort by date
- [ ] Show empty state for no bookings
  - Call-to-action to browse plots
- [ ] Test user booking view

**Rationale:** Users need to track their plot purchases.

**Dependencies:** User booking APIs
**Risk:** Low
**Deliverable:** User booking history page

---

### 6.2 Booking Request Flow (1 day)
**Priority:** 🟡 HIGH - User self-service

- [ ] Add "Request Booking" button on available plots
- [ ] Create booking request form
  - Pre-filled plot details
  - User contact confirmation
  - Payment method preference
  - Additional notes
- [ ] Submit booking request
  - Create pending booking
  - Email admin notification
  - Email user confirmation
- [ ] Show request confirmation
  - "We'll contact you soon" message
  - Expected response time
- [ ] Test booking request flow

**Rationale:** Users should be able to request bookings themselves.

**Dependencies:** Booking request API
**Risk:** Low
**Deliverable:** Self-service booking requests

---

### 6.3 User Dashboard Enhancements (0.5 days)
**Priority:** 🟢 MEDIUM - Improved UX

- [ ] Update dashboard stats with real booking data
- [ ] Add "My Bookings" widget
  - Show recent bookings
  - Quick status view
  - Link to full booking page
- [ ] Add "Available Plots" widget
  - Show featured available plots
  - Link to plot browsing
- [ ] Add notifications section
  - Payment reminders
  - Status updates
  - New plot alerts
- [ ] Test dashboard updates

**Rationale:** Better user experience and engagement.

**Dependencies:** Booking data
**Risk:** Low
**Deliverable:** Enhanced user dashboard

---

## Phase 7: Editor Features (Week 7)
**Goal:** Complete editor role functionality
**Estimated Time:** 3-4 days
**Delivers:** Editor pages and permissions

### 7.1 Editor Plot Management (1 day)
**Priority:** 🟢 MEDIUM - Editor workflow

- [ ] Create `/app/editor/plots/page.js`
- [ ] Implement plot list (similar to admin but filtered)
  - Show only plots in projects assigned to editor
  - Or show all plots with limited actions
- [ ] Allow plot editing
  - Edit plot details
  - Upload images
  - Update status (with restrictions)
- [ ] Restrict actions
  - Can't delete plots
  - Can't change certain fields (price, ownership)
- [ ] Test editor plot access

**Rationale:** Editors need to update plot information without full admin rights.

**Dependencies:** Existing plot APIs (with permission checks)
**Risk:** Low
**Deliverable:** Editor plot management page

---

### 7.2 Editor Booking Processing (1 day)
**Priority:** 🟢 MEDIUM - Editor workflow

- [ ] Create `/app/editor/bookings/page.js`
- [ ] Show bookings list (similar to admin but limited)
  - View all bookings
  - Update booking status (limited transitions)
  - Add notes to bookings
- [ ] Restrict actions
  - Can't create bookings
  - Can't delete bookings
  - Can't verify payments (admin only)
- [ ] Allow status updates
  - Processing → Pending Payment
  - Add tracking notes
  - Email user updates
- [ ] Test editor booking access

**Rationale:** Editors help process bookings but don't have full financial access.

**Dependencies:** Booking APIs with role checks
**Risk:** Medium (permission system)
**Deliverable:** Editor booking page

---

### 7.3 Editor Profile & Dashboard (0.5 days)
**Priority:** 🟢 MEDIUM - Editor experience

- [ ] Create `/app/editor/profile/page.js`
- [ ] Use existing UserProfileForm component
- [ ] Add editor-specific settings if needed
- [ ] Update editor dashboard with real stats
  - Plots assigned
  - Bookings processed
  - Recent activity
- [ ] Test editor profile

**Rationale:** Editors need profile management like other users.

**Dependencies:** Profile API
**Risk:** Low
**Deliverable:** Editor profile page

---

### 7.4 Permission System Refinement (1 day)
**Priority:** 🟡 HIGH - Security

- [ ] Review all API routes for role checks
- [ ] Add middleware for editor permissions
- [ ] Test permission boundaries
  - Editors can't access admin-only features
  - Editors can't modify financial data
  - Editors can view but have limited edit
- [ ] Add permission error handling
- [ ] Document permission model

**Rationale:** Ensure editors have appropriate access without security risks.

**Dependencies:** All editor pages
**Risk:** High (security implications)
**Deliverable:** Secure permission system

---

## Phase 8: Payment Integration (Week 8-9)
**Goal:** Automated payment processing
**Estimated Time:** 7-10 days
**Delivers:** Full payment automation

### 8.1 Payment Provider Selection & Setup (1 day)
**Priority:** 🔴 CRITICAL - Enables automated payments

**Options for Kenya:**
1. **M-Pesa Integration** (Recommended for Kenya)
   - Daraja API (Safaricom)
   - Widely used in Kenya
   - STK Push for easy payments
   - Payment confirmations

2. **Stripe** (International)
   - Card payments
   - Better for international investors
   - Higher fees

3. **Flutterwave** (Africa-focused)
   - M-Pesa + Cards
   - Good for pan-African
   - Reasonable fees

**Recommendation:** Start with M-Pesa (Daraja API) + Stripe for international

Tasks:
- [ ] Research and select provider(s)
- [ ] Create developer accounts
- [ ] Get API credentials (sandbox + production)
- [ ] Review documentation
- [ ] Understand webhook requirements
- [ ] Plan integration approach

**Rationale:** Must choose provider before integration work.

**Dependencies:** None
**Risk:** Medium (provider selection critical)
**Deliverable:** Provider accounts and credentials

---

### 8.2 M-Pesa Integration (3 days)
**Priority:** 🔴 CRITICAL - Primary payment method

- [ ] Set up Daraja API credentials
- [ ] Implement M-Pesa payment initiation
  - STK Push for customer payment
  - Payment amount from booking
  - Customer phone number
- [ ] Create payment callback handler
  - `/api/payments/mpesa/callback`
  - Verify payment signature
  - Update payment record
  - Update booking status
- [ ] Implement payment status checking
  - Query payment status
  - Handle timeout scenarios
- [ ] Add M-Pesa payment UI
  - Payment initiation button
  - Phone number input
  - Payment instructions
  - Status polling
- [ ] Test with sandbox
  - Successful payment
  - Failed payment
  - Timeout scenarios
- [ ] Error handling and retries

**Rationale:** M-Pesa is the primary payment method in Kenya.

**Dependencies:** Payment model, Booking model
**Risk:** High (external integration, financial)
**Deliverable:** Working M-Pesa payments

---

### 8.3 Stripe Integration (2 days)
**Priority:** 🟡 HIGH - International payments

- [ ] Set up Stripe account
- [ ] Install Stripe SDK
- [ ] Create payment intent endpoint
  - `/api/payments/stripe/create-intent`
  - Amount from booking
  - Customer information
- [ ] Implement Stripe Elements UI
  - Card input component
  - Payment form
  - 3D Secure support
- [ ] Create webhook handler
  - `/api/payments/stripe/webhook`
  - Verify webhook signature
  - Handle payment events
  - Update booking status
- [ ] Add Stripe payment UI
  - Card payment form
  - Payment confirmation
  - Receipt generation
- [ ] Test with test cards
- [ ] Error handling

**Rationale:** Enables international investors to pay with cards.

**Dependencies:** Payment model
**Risk:** Medium (external integration)
**Deliverable:** Working card payments

---

### 8.4 Payment Management UI (2 days)
**Priority:** 🟡 HIGH - Payment operations

- [ ] Update booking page with payment UI
  - Payment method selection
  - Payment amount display
  - Payment initiation buttons
- [ ] Add payment status tracking
  - Real-time status updates
  - Payment confirmation display
  - Receipt generation
  - Email confirmations
- [ ] Add payment history view
  - List all payment attempts
  - Show success/failed payments
  - Download receipts
- [ ] Add refund interface (admin only)
  - Initiate refund
  - Refund reason
  - Refund confirmation
- [ ] Test payment UI flows

**Rationale:** Users and admins need to manage payments.

**Dependencies:** Payment integrations
**Risk:** Medium
**Deliverable:** Complete payment UI

---

### 8.5 Payment Testing & Security (1 day)
**Priority:** 🔴 CRITICAL - Financial security

- [ ] Security review
  - Verify webhook signatures
  - Validate payment amounts
  - Check for replay attacks
  - Ensure PCI compliance
- [ ] Test all payment scenarios
  - Successful payments
  - Failed payments
  - Partial payments
  - Duplicate payments
  - Refunds
- [ ] Test edge cases
  - Network failures
  - Timeout handling
  - Concurrent bookings
- [ ] Load testing
  - Multiple simultaneous payments
  - Webhook handling
- [ ] Document payment flows
- [ ] Create troubleshooting guide

**Rationale:** Financial operations must be bulletproof.

**Dependencies:** All payment features
**Risk:** High (financial security)
**Deliverable:** Tested and secure payment system

---

## Phase 9: Testing & Quality Assurance (Week 10)
**Goal:** Add testing infrastructure and achieve coverage
**Estimated Time:** 5-7 days
**Delivers:** Test suite and confidence

### 9.1 Testing Setup (1 day)
**Priority:** 🟡 HIGH - Quality foundation

- [ ] Choose testing framework (Vitest recommended for Next.js)
- [ ] Install testing dependencies
  - Vitest
  - React Testing Library
  - Testing utilities
- [ ] Configure test environment
  - Test database setup
  - Mock S3 for testing
  - Mock email service
- [ ] Set up test scripts in package.json
- [ ] Configure CI/CD for testing (if applicable)

**Rationale:** Foundation for all testing work.

**Dependencies:** None
**Risk:** Low
**Deliverable:** Testing infrastructure

---

### 9.2 Unit Tests - Critical Components (2 days)
**Priority:** 🟡 HIGH - Component reliability

- [ ] Test booking components
  - BookingForm
  - BookingList
  - PaymentVerification
- [ ] Test form components
  - MultiStepForm
  - PlotForm steps
  - ProjectForm steps
- [ ] Test utility functions
  - Date formatting
  - Price calculations
  - Validation functions
- [ ] Test UI components (sample)
  - Button variants
  - Form inputs
  - Cards
- [ ] Aim for 70% component coverage

**Rationale:** Ensure critical components work correctly.

**Dependencies:** Testing setup
**Risk:** Low
**Deliverable:** Component test suite

---

### 9.3 Integration Tests - API Routes (2 days)
**Priority:** 🟡 HIGH - API reliability

- [ ] Test booking APIs
  - Create booking
  - Update booking
  - Delete booking
  - List bookings
- [ ] Test payment APIs
  - Payment initiation
  - Webhook handling
  - Status checking
- [ ] Test authentication
  - Login flow
  - Token validation
  - Permission checks
- [ ] Test plot/project APIs (sample)
- [ ] Aim for 80% API coverage

**Rationale:** Ensure APIs work correctly and handle errors.

**Dependencies:** Testing setup
**Risk:** Medium (requires test database)
**Deliverable:** API test suite

---

### 9.4 End-to-End Tests - Critical Flows (1 day)
**Priority:** 🟢 MEDIUM - User journey validation

Install Playwright or Cypress:
- [ ] Test admin booking creation flow
  - Login → Create booking → Verify payment → Complete
- [ ] Test user booking request flow
  - Login → Browse plots → Request booking → View status
- [ ] Test payment flow (with mock)
  - Initiate payment → Process → Confirmation
- [ ] Test authentication flows
  - Register → Verify email → Login

**Rationale:** Ensure complete user journeys work end-to-end.

**Dependencies:** Working application
**Risk:** Medium (setup complexity)
**Deliverable:** E2E test suite

---

## Phase 10: Documentation & Polish (Ongoing)
**Goal:** Complete documentation and final polish
**Estimated Time:** Ongoing throughout
**Delivers:** Production-ready application

### 10.1 API Documentation (2 days)
**Priority:** 🟢 MEDIUM - Developer experience

- [ ] Document all API endpoints
  - Request/response formats
  - Authentication requirements
  - Error responses
  - Examples
- [ ] Create OpenAPI/Swagger spec
- [ ] Set up API documentation UI (Swagger UI)
- [ ] Document webhook formats
- [ ] Add API usage examples

**Rationale:** Other developers and integrations need API docs.

**Dependencies:** None (can be done anytime)
**Risk:** Low
**Deliverable:** Complete API documentation

---

### 10.2 User Documentation (1 day)
**Priority:** 🟢 MEDIUM - User onboarding

- [ ] Create user guide
  - How to create account
  - How to browse plots
  - How to request booking
  - How to make payment
  - How to access title deed
- [ ] Create admin guide
  - How to manage plots
  - How to process bookings
  - How to verify payments
  - How to manage investors
- [ ] Add in-app help tooltips
- [ ] Create FAQ page

**Rationale:** Users need guidance on using the system.

**Dependencies:** None
**Risk:** Low
**Deliverable:** User documentation

---

### 10.3 Code Quality & Optimization (Ongoing)
**Priority:** 🟢 MEDIUM - Continuous improvement

- [ ] Run Lighthouse audit
- [ ] Optimize bundle size
- [ ] Add code splitting where beneficial
- [ ] Optimize database queries
- [ ] Add caching strategies
- [ ] Review and fix ESLint warnings
- [ ] Add loading states everywhere
- [ ] Improve error messages
- [ ] Add skeleton loaders

**Rationale:** Ensure good performance and UX.

**Dependencies:** Features complete
**Risk:** Low
**Deliverable:** Optimized application

---

## Summary: Implementation Order at a Glance

### Week 1: Quick Wins & Foundation
1. Environment docs (.env.example)
2. Error pages (unauthorized, 404)
3. User profile pages
4. Booking model
5. Payment model
6. Model validations

### Week 2: Booking APIs
7. Admin booking APIs
8. Payment verification APIs
9. User booking APIs
10. API testing

### Week 3-4: Admin Booking UI
11. Booking list page
12. Create booking flow
13. Booking details page
14. Payment verification UI
15. Edit/cancel bookings
16. Booking analytics

### Week 5: Investor Management
17. Investor list page
18. Investor portfolio view
19. Investor analytics

### Week 6: User Features
20. User booking history
21. Booking request flow
22. Dashboard enhancements

### Week 7: Editor Features
23. Editor plot management
24. Editor booking processing
25. Editor profile
26. Permission refinement

### Week 8-9: Payment Integration
27. Provider setup
28. M-Pesa integration
29. Stripe integration
30. Payment UI
31. Payment testing

### Week 10: Testing & Quality
32. Testing setup
33. Unit tests
34. Integration tests
35. E2E tests
36. Documentation
37. Optimization

---

## Risk Mitigation Strategies

### High-Risk Items
1. **Payment Integration**
   - Mitigation: Start with sandbox, extensive testing, security review
   - Fallback: Keep manual payment verification as backup

2. **Data Model Changes**
   - Mitigation: Plan schema carefully, add migrations
   - Fallback: Database backup before major changes

3. **Permission System**
   - Mitigation: Comprehensive permission testing
   - Fallback: Default to most restrictive permissions

### Medium-Risk Items
1. **Complex Business Logic**
   - Mitigation: Write tests first, code review
   - Fallback: Add logging and monitoring

2. **External Dependencies**
   - Mitigation: Handle failures gracefully, add retries
   - Fallback: Queue systems for reliability

---

## Dependencies & Blockers

### Critical Path
```
Environment Docs → No blockers
Database Models → Blocks all Phase 4 features
Booking APIs → Blocks all booking UI
Admin Booking UI → Blocks user booking features
Payment Integration → Blocks automated payments
```

### Parallel Work Opportunities
These can be done simultaneously:
- User profile pages (Week 1)
- Error pages (Week 1)
- Documentation (Anytime)
- Testing setup (Anytime)
- Code optimization (Ongoing)

---

## Success Metrics

### Week 1
- ✅ .env.example created
- ✅ Error pages working
- ✅ User can edit profile
- ✅ Database models created

### Week 2
- ✅ All booking APIs functional
- ✅ API tests passing

### Week 4
- ✅ Admin can create bookings
- ✅ Admin can verify payments
- ✅ Admin can view all bookings

### Week 6
- ✅ Users can view their bookings
- ✅ Users can request new bookings

### Week 9
- ✅ Automated payments working
- ✅ Payment confirmations sent

### Week 10
- ✅ Test coverage > 70%
- ✅ Documentation complete
- ✅ Ready for production

---

## Estimated Effort

| Phase | Duration | Complexity |
|-------|----------|------------|
| 1. Quick Wins | 2-3 days | Low |
| 2. Database Foundation | 2 days | Low |
| 3. Booking APIs | 4-5 days | Medium |
| 4. Admin Booking UI | 7-10 days | Medium |
| 5. Investor Management | 5-7 days | Medium |
| 6. User Features | 3-5 days | Low |
| 7. Editor Features | 3-4 days | Medium |
| 8. Payment Integration | 7-10 days | High |
| 9. Testing & QA | 5-7 days | Medium |
| 10. Documentation | Ongoing | Low |

**Total Estimated Time:** 8-10 weeks (1 developer full-time)

---

## Next Steps - Let's Start!

I recommend we begin with **Phase 1: Quick Wins** to deliver immediate value:

1. **First** - Create .env.example (30 minutes)
2. **Second** - Create error pages (2 hours)
3. **Third** - Create user profile page (1 day)
4. **Then** - Move to database models

Would you like me to start with Phase 1.1 (Environment Documentation)?

---

**Document Owner:** Development Team
**Last Updated:** November 13, 2025
**Status:** Ready for Implementation
