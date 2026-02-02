import { FiCode, FiTrendingUp, FiZap } from 'react-icons/fi';
import { trackCTAClick } from '@/lib/gtag';

/**
 * Hero Component
 * Main landing section with CTA
 */
export default function Hero() {
  return (
    <section className="section pt-32 md:pt-40 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-dark-700 border border-gray-800 rounded-full px-4 py-2 mb-6">
              <span className="text-xl">✨</span>
              <span className="text-sm text-gray-300">Premium Developer Domain</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">0dev.io</span>
              <br />
              <span className="text-white">Tools & Resources</span>
              <br />
              <span className="text-gray-400 text-3xl md:text-4xl">
                for Developers
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              A <strong className="text-white">short, memorable, and powerful</strong> domain 
              perfect for tech startups, developer communities, AI platforms, and SaaS products.
            </p>

            {/* CTA for Sale */}
            <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-primary-500/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">
                🎯 This Domain Is Available for Sale
              </h2>
              <p className="text-gray-300 mb-4">
                Secure this premium .io domain and build the next generation of developer tools
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => trackCTAClick('hero-primary')}
                  className="btn btn-primary text-lg"
                >
                  <a href="#cta">Acquire 0dev.io Now</a>
                </button>
                <button className="btn btn-secondary text-lg">
                  <a href="#stats">View Statistics</a>
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-500 mb-1">3K+</div>
                <div className="text-sm text-gray-400">Monthly Searches</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-500 mb-1">50+</div>
                <div className="text-sm text-gray-400">Quality Backlinks</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-500 mb-1">4</div>
                <div className="text-sm text-gray-400">Characters Only</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="animate-fade-in-right">
            <div className="card p-0 overflow-hidden">
              {/* Code Terminal */}
              <div className="bg-dark-800 p-4 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">terminal</span>
                </div>
              </div>
              <div className="p-6 bg-dark-700 font-mono text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-primary-500 mr-2">$</span>
                    <span className="text-gray-300">npm install @0dev/cli</span>
                  </div>
                  <div className="text-gray-500">// Initialize your project</div>
                  <div className="flex items-center">
                    <span className="text-primary-500 mr-2">$</span>
                    <span className="text-gray-300">0dev init</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Project initialized successfully!</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-gray-500 mb-2">// Perfect for:</div>
                    <div className="space-y-1 text-gray-400">
                      <div>• Developer Tools & Resources</div>
                      <div>• AI-Powered Platforms</div>
                      <div>• SaaS Products</div>
                      <div>• Tech Communities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="card text-center p-4">
                <FiCode className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Developer Focus</p>
              </div>
              <div className="card text-center p-4">
                <FiTrendingUp className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">High Traffic</p>
              </div>
              <div className="card text-center p-4">
                <FiZap className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">SEO Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
