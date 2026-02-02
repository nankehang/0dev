/**
 * DomainValue Component
 * Highlights why 0dev.io is a premium domain
 */
export default function DomainValue() {
  const values = [
    {
      icon: '💎',
      title: 'Short & Memorable',
      description: 'Only 4 characters with .io extension - perfect for branding',
    },
    {
      icon: '🎯',
      title: 'Developer Focused',
      description: '"0dev" instantly recognizable to developers worldwide',
    },
    {
      icon: '🚀',
      title: 'Tech Oriented',
      description: '.io is the gold standard for tech startups and SaaS',
    },
    {
      icon: '📈',
      title: 'SEO Optimized',
      description: '3,000+ monthly searches with quality backlinks',
    },
    {
      icon: '🌐',
      title: 'Global Appeal',
      description: 'Universal recognition across all tech markets',
    },
    {
      icon: '⚡',
      title: 'Startup Ready',
      description: 'Perfect for AI tools, dev platforms, or communities',
    },
  ];

  return (
    <section id="features" className="section bg-dark-800">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Why <span className="gradient-text">0dev.io</span> is a Premium Domain
          </h2>
          <p className="section-subtitle">
            A rare opportunity to own a short, tech-focused domain
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="card group hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {value.title}
              </h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Domain Age & History */}
        <div className="mt-16 card bg-gradient-to-r from-primary-600/10 to-purple-600/10 border-primary-500/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Domain History & Value</h3>
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">2020</div>
                <div className="text-sm text-gray-400">Registration Year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">5+</div>
                <div className="text-sm text-gray-400">Years Old</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">100%</div>
                <div className="text-sm text-gray-400">Clean History</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">Top 1%</div>
                <div className="text-sm text-gray-400">Domain Rarity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
