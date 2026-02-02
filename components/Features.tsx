/**
 * Features Component
 * Code examples and use case scenarios
 */
export default function Features() {
  const codeExample = `// Perfect for developer platforms
import { DevTools } from '@0dev/core';

const platform = new DevTools({
  features: ['AI', 'Analytics', 'Security'],
  deployment: 'cloud',
});

platform.launch();
// 🚀 Your startup is live!`;

  const useCases = [
    {
      title: 'Developer Platform',
      description: 'Build a comprehensive developer tools marketplace',
      icon: '💻',
    },
    {
      title: 'AI Tool Suite',
      description: 'Launch AI-powered coding assistants and automation',
      icon: '🧠',
    },
    {
      title: 'SaaS Product',
      description: 'Create subscription-based developer services',
      icon: '☁️',
    },
    {
      title: 'Tech Community',
      description: 'Establish a hub for developers to learn and share',
      icon: '👥',
    },
  ];

  return (
    <section className="section bg-dark-800">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Code Example */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-gray-400 mb-6">
              0dev.io is the perfect foundation for your next tech venture. 
              Whether you're building developer tools, AI platforms, or SaaS products, 
              this domain gives you instant credibility.
            </p>
            <div className="card p-0 overflow-hidden">
              <div className="bg-dark-900 px-4 py-3 border-b border-gray-800">
                <span className="text-sm text-gray-500 font-mono">example.ts</span>
              </div>
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm text-gray-300">{codeExample}</code>
              </pre>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Potential Use Cases</h3>
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="card group hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {useCase.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-white">
                        {useCase.title}
                      </h4>
                      <p className="text-gray-400">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
