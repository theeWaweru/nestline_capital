export default function UserFlows() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            User Flows & Capabilities
          </h1>
          <p className="text-sm text-gray-600">
            Role-based access and workflows for Kiota platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Guest User Flow */}
        <section className="bg-white p-8 rounded-lg border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Guest User</h2>
              <p className="text-sm text-gray-600">
                Shared credentials: guest@nestlinecapital.com
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Access & Capabilities
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-900 mb-2">
                    ✓ Can Access
                  </h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• View all projects and locations</li>
                    <li>• View available plots (not sold/reserved)</li>
                    <li>• See plot details: size, price, location</li>
                    <li>• View project amenities</li>
                    <li>• Explore map with plot boundaries</li>
                    <li>• View phase status (ready/in-development)</li>
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-medium text-rose-900 mb-2">
                    ✗ Cannot Access
                  </h4>
                  <ul className="text-sm text-rose-800 space-y-1">
                    <li>• Submit purchase requests</li>
                    <li>• Contact property owners</li>
                    <li>• Save favorite plots</li>
                    <li>• View sold plot details</li>
                    <li>• Download documents</li>
                    <li>• Track inquiries</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                User Journey
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-medium mb-1">1. Entry Point</div>
                  <p className="text-sm text-gray-600">
                    Visits kiota.nestlinecapital.com
                  </p>
                  <p className="text-sm text-gray-600">
                    Logs in with guest credentials
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-medium mb-1">2. Browse Properties</div>
                  <p className="text-sm text-gray-600">Views project list</p>
                  <p className="text-sm text-gray-600">
                    Explores plot grid & map
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-medium mb-1">3. Decision Point</div>
                  <p className="text-sm text-gray-600">
                    Must register to inquire
                  </p>
                  <p className="text-sm text-gray-600">
                    Sees &quot;Sign up to continue&quot; CTA
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Purpose:</strong> Allow property browsing without
                commitment. Reduce friction for users who want to explore before
                creating an account.
              </p>
            </div>
          </div>
        </section>

        {/* Registered User Flow */}
        <section className="bg-white p-8 rounded-lg border-2 border-emerald-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Registered User
              </h2>
              <p className="text-sm text-gray-600">
                Self-signup with email verification
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Access & Capabilities
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-900 mb-2">
                    ✓ Can Access
                  </h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• All guest capabilities</li>
                    <li>• Submit purchase requests for plots</li>
                    <li>• Upload payment proof (screenshots/images)</li>
                    <li>• Track purchase request status</li>
                    <li>• View request history</li>
                    <li>• Save favorite plots (future)</li>
                    <li>• Receive email notifications</li>
                    <li>• Personal dashboard</li>
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-medium text-rose-900 mb-2">
                    ✗ Cannot Access
                  </h4>
                  <ul className="text-sm text-rose-800 space-y-1">
                    <li>• View title deeds</li>
                    <li>• Access ownership documents</li>
                    <li>• See sold plot internal details</li>
                    <li>• Admin functions</li>
                    <li>• Payment history (until purchase)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Purchase Request Flow
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Select Plot(s)</div>
                    <p className="text-sm text-gray-600">
                      Browse available plots, can select multiple via checkbox
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Submit Purchase Request</div>
                    <p className="text-sm text-gray-600">
                      Fill form: payment amount, method, upload proof images,
                      add notes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Pending Review</div>
                    <p className="text-sm text-gray-600">
                      Admin receives email notification, user sees &quot;Under
                      Review&quot; status
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      Admin Verification (48hrs)
                    </div>
                    <p className="text-sm text-gray-600">
                      Admin confirms payment, enters verified amount and
                      contract date
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    5
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Approved → Upgraded User</div>
                    <p className="text-sm text-gray-600">
                      User upgraded to &quot;Purchased User&quot;, gains access
                      to ownership portal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-900">
                <strong>Purpose:</strong> Enable serious buyers to initiate
                purchases while admin maintains payment verification control.
              </p>
            </div>
          </div>
        </section>

        {/* Purchased User */}
        <section className="bg-white p-8 rounded-lg border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Purchased User
              </h2>
              <p className="text-sm text-gray-600">
                Upgraded automatically after payment approval
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Additional Capabilities
              </h3>
              <div className="bg-purple-50 p-4 rounded-lg">
                <ul className="text-sm text-purple-900 space-y-2">
                  <li>
                    • <strong>My Properties Dashboard:</strong> View all owned
                    plots
                  </li>
                  <li>
                    • <strong>Title Deeds:</strong> Download official title
                    documents
                  </li>
                  <li>
                    • <strong>Payment Tracking:</strong> View payment history,
                    remaining balance
                  </li>
                  <li>
                    • <strong>Contract Info:</strong> Contract start date,
                    90-day deadline countdown
                  </li>
                  <li>
                    • <strong>Payment Calculator:</strong> System
                    auto-calculates: Total Paid vs. Plot Price = Remaining
                  </li>
                  <li>
                    • <strong>Multiple Plots:</strong> Can own multiple plots
                    across different phases
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Payment Tracking Example
              </h3>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plot Price:</span>
                    <span className="font-medium">KES 399,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-medium text-emerald-600">
                      KES 120,000
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-gray-600">Remaining Balance:</span>
                    <span className="font-medium text-amber-600">
                      KES 279,000
                    </span>
                  </div>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Contract Start:</span>
                    <span className="font-medium">Jan 15, 2025</span>
                  </p>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Deadline:</span>
                    <span className="font-medium text-rose-600">
                      Apr 15, 2025 (45 days left)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-900">
                <strong>Note:</strong> Plots must be fully paid within 90 days
                of contract start. Users can make multiple partial payments.
              </p>
            </div>
          </div>
        </section>

        {/* Admin User Flow */}
        <section className="bg-white p-8 rounded-lg border-2 border-rose-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-rose-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Admin User</h2>
              <p className="text-sm text-gray-600">
                admin@nestlinecapital.com + team members
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Full System Access
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-medium text-rose-900 mb-2">
                    Content Management
                  </h4>
                  <ul className="text-sm text-rose-800 space-y-1">
                    <li>• Create/Edit/Delete Projects</li>
                    <li>• Create/Edit/Delete Plots</li>
                    <li>• Manage Phases</li>
                    <li>• Upload media (images, docs)</li>
                    <li>• Set pricing & availability</li>
                    <li>• Map coordinate management</li>
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-medium text-rose-900 mb-2">
                    User & Purchase Management
                  </h4>
                  <ul className="text-sm text-rose-800 space-y-1">
                    <li>• Review purchase requests</li>
                    <li>• Approve/Reject payments</li>
                    <li>• Manage user accounts</li>
                    <li>• Track payment history</li>
                    <li>• Generate reports</li>
                    <li>• CSV data export</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Purchase Request Approval Flow
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium mb-2">1. Notification</div>
                  <p className="text-sm text-gray-600">
                    Receives email when user submits purchase request
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium mb-2">2. Review Request</div>
                  <p className="text-sm text-gray-600">
                    Views: User details, selected plots, payment proof images,
                    submitted amount
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium mb-2">3. Verify Payment</div>
                  <p className="text-sm text-gray-600">
                    Confirms transaction via bank/M-Pesa, checks payment proof
                    authenticity
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium mb-2">4. Input Verified Data</div>
                  <p className="text-sm text-gray-600">
                    Enters: Confirmed amount, payment date, contract start date
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium mb-2">5. Approve/Reject</div>
                  <p className="text-sm text-gray-600">
                    If approved: User upgraded, plot status updated,
                    confirmation email sent
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Admin Pages Overview
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin</span>
                  <span className="text-gray-600">
                    Dashboard with stats & recent activity
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/projects</span>
                  <span className="text-gray-600">
                    Project list & management
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/projects/new</span>
                  <span className="text-gray-600">Create new project</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/plots</span>
                  <span className="text-gray-600">
                    Plot inventory management
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/plots/new</span>
                  <span className="text-gray-600">Create new plot</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/purchases</span>
                  <span className="text-gray-600">Purchase request queue</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/quotes</span>
                  <span className="text-gray-600">
                    Quote request management
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/leads</span>
                  <span className="text-gray-600">Lead tracking & CRM</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/users</span>
                  <span className="text-gray-600">User management</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/media</span>
                  <span className="text-gray-600">Media library</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="font-medium w-48">/admin/settings</span>
                  <span className="text-gray-600">System configuration</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 p-4 rounded-lg">
              <p className="text-sm text-rose-900">
                <strong>Key Responsibility:</strong> Verify all payments within
                48 hours. Maintain accurate plot status. Ensure data integrity
                across system.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Guest</th>
                  <th className="text-center py-3 px-4">Registered</th>
                  <th className="text-center py-3 px-4">Purchased</th>
                  <th className="text-center py-3 px-4">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="py-3 px-4">Browse Properties</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Submit Purchase Requests</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Track Purchase Status</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">View Title Deeds</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Payment Tracking</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Manage Content</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Approve Payments</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold mb-3 text-amber-900">
            Implementation Notes
          </h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>
              <strong>Authentication:</strong> Separate portals - /admin for
              admins, /portal for users
            </li>
            <li>
              <strong>Role Upgrade:</strong> Automatic on payment approval - no
              manual user intervention
            </li>
            <li>
              <strong>90-Day Rule:</strong> System tracks contract start + 90
              days, sends reminders at 7 days remaining
            </li>
            <li>
              <strong>Multiple Plots:</strong> Users can own multiple plots;
              each tracked independently
            </li>
            <li>
              <strong>Guest Account:</strong> Shared credentials, read-only, no
              data persistence
            </li>
            <li>
              <strong>Email Notifications:</strong> Sent on: Registration,
              Purchase submission, Approval/Rejection, Payment reminders
            </li>
            <li>
              <strong>Audit Logs:</strong> Track all admin actions for
              accountability
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
