import React from 'react';
export function TechnicalRequirements() {
  return <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Role Level</label>
        <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Intern</option>
          <option>Junior</option>
          <option>Mid-level</option>
          <option>Senior</option>
          <option>Lead</option>
          <option>Principal/Staff</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Programming Languages (select 2-3 max)
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="js" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="js">JavaScript</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="ts" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="ts">TypeScript</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="python" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="python">Python</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="java" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="java">Java</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="csharp" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="csharp">C#</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="go" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="go">Go</label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Frontend Frameworks
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="react" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="react">React</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="vue" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="vue">Vue</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="angular" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="angular">Angular</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="nextjs" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="nextjs">Next.js</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Backend Frameworks
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="node" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="node">Node.js</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="express" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="express">Express</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="django" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="django">Django</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="spring" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="spring">Spring</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Databases</label>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="postgres" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="postgres">PostgreSQL</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="mysql" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="mysql">MySQL</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="mongodb" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="mongodb">MongoDB</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="redis" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="redis">Redis</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="firebase" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="firebase">Firebase</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="elastic" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="elastic">Elasticsearch</label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Cloud Platforms
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="aws" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="aws">AWS</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="gcp" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="gcp">Google Cloud</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="azure" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="azure">Azure</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="heroku" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="heroku">Heroku</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="vercel" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="vercel">Vercel</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="netlify" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="netlify">Netlify</label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          System Design Skills
        </label>
        <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Must have</option>
          <option>Good to have</option>
          <option>Not required</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Testing & CI/CD
        </label>
        <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Must have</option>
          <option>Good to have</option>
          <option>Not required</option>
        </select>
      </div>
    </div>;
}