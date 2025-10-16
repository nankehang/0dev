import { trackCTAClick, trackEmailClick } from '@/lib/gtag';
import ContactForm from './ContactForm';

/**
 * CTA Component
 * Final call-to-action for domain acquisition
 */
export default function CTA() {
  const handleEmailClick = () => {
    trackEmailClick();
    window.location.href = 'mailto:contact@0dev.io?subject=Inquiry about 0dev.io Domain Purchase';
  };

  return (
    <>
    <section id="cta" className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-purple-600/20"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="card border-primary-500/50 bg-gradient-to-br from-dark-700 to-dark-800">
            <div className="mb-8">
              <span className="text-6xl mb-6 inline-block animate-float">🚀</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Acquire <span className="gradient-text">0dev.io</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't miss this opportunity to own a <strong className="text-white">premium developer domain</strong>. 
                Short, memorable, and perfect for your tech startup or developer platform.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500 text-2xl">✓</span>
                <span className="text-gray-300">Instant Transfer</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500 text-2xl">✓</span>
                <span className="text-gray-300">Secure Escrow</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500 text-2xl">✓</span>
                <span className="text-gray-300">Full Ownership</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleEmailClick}
                className="btn btn-primary text-lg px-8 py-4"
              >
                📧 Contact Us Now
              </button>
              <button
                onClick={() => trackCTAClick('cta-learn-more')}
                className="btn btn-secondary text-lg px-8 py-4"
              >
                <a href="#features">Learn More</a>
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              💼 Serious inquiries only. Domain broker services available.
            </p>
          </div>

            {/* Additional Info */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-3xl mb-3">💎</div>
              <h4 className="font-semibold mb-2">Premium Value</h4>
              <p className="text-sm text-gray-400">
                Short .io domains are highly sought after in the tech industry
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold mb-2">Secure Process</h4>
              <p className="text-sm text-gray-400">
                Safe transfer through trusted escrow services
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">Quick Transfer</h4>
              <p className="text-sm text-gray-400">
                Complete ownership transfer within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Contact Form Section (Make an Offer) */}
    <section className="section bg-dark-900">
      <div className="container">
        <ContactForm />
      </div>
    </section>
    </>
  );
}
