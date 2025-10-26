export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Kiota Design System
          </h1>
          <p className="text-sm text-gray-600">
            Nestline Capital Property Management Platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Colors */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-[#5c8a75] rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Sage Green</p>
              <p className="text-xs text-gray-600">#5c8a75</p>
              <p className="text-xs text-gray-500">Primary Brand</p>
            </div>
            <div>
              <div className="h-24 bg-emerald-600 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Success</p>
              <p className="text-xs text-gray-600">#059669</p>
              <p className="text-xs text-gray-500">Available plots</p>
            </div>
            <div>
              <div className="h-24 bg-amber-500 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Warning</p>
              <p className="text-xs text-gray-600">#f59e0b</p>
              <p className="text-xs text-gray-500">On-hold plots</p>
            </div>
            <div>
              <div className="h-24 bg-blue-500 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Info</p>
              <p className="text-xs text-gray-600">#3b82f6</p>
              <p className="text-xs text-gray-500">Reserved plots</p>
            </div>
            <div>
              <div className="h-24 bg-rose-500 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Danger</p>
              <p className="text-xs text-gray-600">#f43f5e</p>
              <p className="text-xs text-gray-500">Sold plots</p>
            </div>
            <div>
              <div className="h-24 bg-gray-900 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Dark</p>
              <p className="text-xs text-gray-600">#111827</p>
              <p className="text-xs text-gray-500">Text primary</p>
            </div>
            <div>
              <div className="h-24 bg-gray-500 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">Gray</p>
              <p className="text-xs text-gray-600">#6b7280</p>
              <p className="text-xs text-gray-500">Text secondary</p>
            </div>
            <div>
              <div className="h-24 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
              <p className="mt-2 text-sm font-medium">White</p>
              <p className="text-xs text-gray-600">#ffffff</p>
              <p className="text-xs text-gray-500">Background</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Typography
          </h2>
          <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <p className="text-sm text-gray-600">
                Font: Funnel Display, 36px, Bold
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <p className="text-sm text-gray-600">
                Font: Funnel Display, 30px, Semibold
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <p className="text-sm text-gray-600">
                Font: Funnel Display, 24px, Semibold
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium">Heading 4</h4>
              <p className="text-sm text-gray-600">
                Font: Funnel Display, 20px, Medium
              </p>
            </div>
            <div>
              <p className="text-base">
                Body Text - Regular paragraph text for content
              </p>
              <p className="text-sm text-gray-600">
                Font: Quicksand, 16px, Regular
              </p>
            </div>
            <div>
              <p className="text-sm">
                Small Text - Secondary information and labels
              </p>
              <p className="text-sm text-gray-600">
                Font: Quicksand, 14px, Regular
              </p>
            </div>
            <div>
              <p className="text-xs">Caption Text - Timestamps and metadata</p>
              <p className="text-sm text-gray-600">
                Font: Quicksand, 12px, Regular
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
              <button className="w-full bg-[#5c8a75] hover:bg-[#4a6f5f] text-white px-4 py-2 rounded-md font-medium transition-colors">
                Primary Button
              </button>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Secondary Button
              </button>
              <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors">
                Outline Button
              </button>
              <button className="w-full text-[#5c8a75] hover:text-[#4a6f5f] px-4 py-2 rounded-md font-medium transition-colors">
                Text Button
              </button>
            </div>
            <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Success Button
              </button>
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Danger Button
              </button>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Warning Button
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Info Button
              </button>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Form Elements
          </h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Input
              </label>
              <input
                type="text"
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Dropdown
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent">
                <option>Choose an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Textarea
              </label>
              <textarea
                rows="4"
                placeholder="Enter description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="check"
                className="w-4 h-4 text-[#5c8a75] border-gray-300 rounded focus:ring-[#5c8a75]"
              />
              <label htmlFor="check" className="text-sm text-gray-700">
                Checkbox Label
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="radio"
                name="radio"
                className="w-4 h-4 text-[#5c8a75] border-gray-300 focus:ring-[#5c8a75]"
              />
              <label htmlFor="radio" className="text-sm text-gray-700">
                Radio Button Label
              </label>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
              <p className="text-sm text-gray-600">
                Simple card with content and border
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
              <p className="text-sm text-gray-600">
                Card with shadow elevation
              </p>
            </div>
            <div className="bg-[#5c8a75] text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Colored Card</h3>
              <p className="text-sm opacity-90">Brand-colored card variant</p>
            </div>
          </div>
        </section>

        {/* Spacing Scale */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Spacing Scale
          </h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">xs (4px)</div>
              <div className="h-4 w-4 bg-[#5c8a75]"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">sm (8px)</div>
              <div className="h-4 w-8 bg-[#5c8a75]"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">md (16px)</div>
              <div className="h-4 w-16 bg-[#5c8a75]"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">lg (24px)</div>
              <div className="h-4 w-24 bg-[#5c8a75]"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">xl (32px)</div>
              <div className="h-4 w-32 bg-[#5c8a75]"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
