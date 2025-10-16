import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * NewsBar Component
 * Dynamic news ticker fetching latest Hacker News headlines
 */
export default function NewsBar() {
  const [items, setItems] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch top stories from Hacker News (public API)
    const fetchTop = async () => {
      try {
        const topRes = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids: number[] = topRes.data.slice(0, 10);
        const promises = ids.slice(0, 5).map((id) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );
        const results = await Promise.all(promises);
        const headlines = results
          .map((r) => r.data)
          .filter(Boolean)
          .map((d) => (d.title ? d.title : 'Tech update'));
        setItems(headlines.slice(0, 5));
      } catch (e) {
        // Fallback static items
        setItems([
          'Premium .io domain available for transfer',
          '3,000+ monthly organic searches — strong SEO potential',
          'Perfect for developer tools, AI platforms, and SaaS',
        ]);
      }
    };

    fetchTop();
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items]);

  return (
    <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-2 mt-20 overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-center">
          <div className="animate-pulse mr-3 text-lg">📢</div>
          <p className="text-sm md:text-base font-medium">
            {items.length ? items[index] : 'Loading news...'}
          </p>
        </div>
      </div>
    </div>
  );
}
