import Link from 'next/link';

/**
 * Footer Component
 * Site footer with links and copyright
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    resources: [
      { label: 'Developer Tools', href: '#tools' },
      { label: 'Features', href: '#features' },
      { label: 'Statistics', href: '#stats' },
    ],
    company: [
      { label: 'Acquire Domain', href: '#cta' },
      { label: 'Contact', href: 'mailto:khusanakihang@gmail.com' },
      { label: 'Privacy Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-dark-800 border-t border-gray-800 py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🚀</span>
              <span className="text-2xl font-bold gradient-text">0dev.io</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Premium developer domain for sale. Perfect for tech startups, 
              AI platforms, and SaaS products. Short, memorable, and SEO-optimized.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>📧</span>
              <a
                href="mailto:khusanakihang@gmail.com"
                className="hover:text-primary-500 transition-colors"
              >
                khusanakihang@gmail.com
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} 0dev.io. All rights reserved. Premium domain for sale.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with Next.js • Optimized for SEO • Google Analytics Integrated
          </p>
        </div>
      </div>
    </footer>
  );
}
