import { useEffect, useState } from 'react';

/**
 * NewsBar Component
 * Scrolling news ticker for tech/dev engagement
 */
export default function NewsBar() {
  const [currentNews, setCurrentNews] = useState(0);

  const newsItems = [
    '🎉 Premium .io domain available for immediate transfer',
    '🚀 3,000+ monthly organic searches - High traffic potential',
    '💎 Short, memorable, perfect for tech startups and SaaS',
    '📈 50+ quality backlinks from tech industry leaders',
    '⚡ Ideal for developer tools, AI platforms, and coding communities',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-2 mt-20 overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-center">
          <div className="animate-pulse mr-3 text-lg">📢</div>
          <p className="text-sm md:text-base font-medium">
            {newsItems[currentNews]}
          </p>
        </div>
      </div>
    </div>
  );
}
