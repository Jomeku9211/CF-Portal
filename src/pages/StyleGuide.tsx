import React from 'react';
import { ChevronDown } from 'lucide-react';

export function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <h1 className="text-4xl font-bold text-sanjuan-dark mb-4">Design System</h1>
          <p className="text-sanjuan-base">Tokens: colors, typography, spacing, radius, and shadows used across the app.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="card p-4"><div className="w-full h-10 rounded bg-sanjuan-base mb-2" /><p className="text-sm">sanjuan.base</p></div>
            <div className="card p-4"><div className="w-full h-10 rounded bg-sanjuan-dark mb-2" /><p className="text-sm">sanjuan.dark</p></div>
            <div className="card p-4"><div className="w-full h-10 rounded bg-tango-base mb-2" /><p className="text-sm">tango.base</p></div>
            <div className="card p-4"><div className="w-full h-10 rounded bg-tango-dark mb-2" /><p className="text-sm">tango.dark</p></div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-sanjuan-dark mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="primary px-5 py-3 rounded-xl shadow-md">Primary</button>
            <button className="secondary px-5 py-3 rounded-xl">Secondary</button>
            <button className="px-5 py-3 rounded-xl bg-tango-base text-white hover:bg-tango-dark transition-colors">Accent</button>
            <button className="px-5 py-3 rounded-xl border border-sanjuan-lighter text-sanjuan-dark bg-white hover:bg-sanjuan-lightest">Ghost</button>
            <button className="px-5 py-3 rounded-xl bg-sanjuan-dark text-white opacity-50 cursor-not-allowed" disabled>Disabled</button>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-sanjuan-dark mb-6">Inputs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 space-y-3">
              <label className="block text-sanjuan-dark font-medium">Text</label>
              <input className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="Type here" />
            </div>
            <div className="card p-6 space-y-3">
              <label className="block text-sanjuan-dark font-medium">Password</label>
              <input type="password" className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="••••••••" />
            </div>
            <div className="card p-6 space-y-3">
              <label className="block text-sanjuan-dark font-medium">Textarea</label>
              <textarea className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" rows={4} placeholder="Write something..." />
            </div>
            <div className="card p-6 space-y-3">
              <label className="block text-sanjuan-dark font-medium">Checkboxes</label>
              <div className="space-y-2 text-sanjuan-dark">
                <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 text-sanjuan-base" /> Option A</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 text-sanjuan-base" /> Option B</label>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-sanjuan-dark mb-6">Dropdowns</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 space-y-3">
              <label className="block text-sanjuan-dark font-medium">Native Select</label>
              <select className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light bg-white">
                <option>Choose an option</option>
                <option>Option A</option>
                <option>Option B</option>
              </select>
            </div>
            <div className="card p-6 space-y-3">
              <label className="block text-sanjuan-dark font-medium">Custom Select</label>
              <button className="w-full flex items-center justify-between px-4 py-2 border border-sanjuan-lighter rounded-lg bg-white text-sanjuan-dark">
                Select item
                <ChevronDown className="h-4 w-4" />
              </button>
              <p className="text-sm text-sanjuan-base">Hook up to a dropdown menu component (headless UI or custom).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-sanjuan-dark mb-6">Badges & Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6"><span className="badge">Badge</span><p className="mt-4 text-sanjuan-base">Generic card with badge.</p></div>
            <div className="card p-6"><h3 className="text-xl font-semibold">Card Title</h3><p className="mt-2 text-sanjuan-base">Supporting text for cards.</p></div>
            <div className="card p-6"><button className="primary px-4 py-2 rounded-xl">Call to Action</button></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StyleGuidePage;


