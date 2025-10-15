import { trackToolCardClick } from '@/lib/gtag';

/**
 * Tools Component
 * Showcase of developer tools and potential use cases
 */
export default function Tools() {
  const tools = [
    {
      icon: '🤖',
      title: 'AI Code Assistant',
      description: 'Intelligent code completion powered by advanced language models',
      tags: ['AI', 'Productivity'],
    },
    {
      icon: '⚡',
      title: 'Performance Monitor',
      description: 'Real-time application performance monitoring and analytics',
      tags: ['Monitoring', 'DevOps'],
    },
    {
      icon: '🔒',
      title: 'Security Scanner',
      description: 'Automated vulnerability detection for your codebase',
      tags: ['Security', 'Automation'],
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Comprehensive data visualization and insights platform',
      tags: ['Analytics', 'Visualization'],
    },
    {
      icon: '🐳',
      title: 'Container Manager',
      description: 'Simplified Docker and Kubernetes management',
      tags: ['DevOps', 'Containers'],
    },
    {
      icon: '🧪',
      title: 'Testing Suite',
      description: 'End-to-end testing framework for modern applications',
      tags: ['Testing', 'Quality'],
    },
  ];

  return (
    <section id="tools" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Popular Developer Tools & Resources
          </h2>
          <p className="section-subtitle">
            Perfect platform for building the next generation of developer tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="card group cursor-pointer"
              onClick={() => trackToolCardClick(tool.title)}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {tool.title}
              </h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <div className="flex gap-2 flex-wrap">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-dark-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
