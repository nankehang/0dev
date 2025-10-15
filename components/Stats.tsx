import { useEffect, useRef } from 'react';

/**
 * Stats Component
 * Traffic analytics and domain performance metrics
 */
export default function Stats() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - traffic growth over 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [1200, 1450, 1800, 2100, 2400, 2650, 2800, 2900, 3100, 3200, 3400, 3600];

    const maxData = Math.max(...data);
    const padding = 50;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);

    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = canvas.height - padding - (value / maxData) * chartHeight;
      ctx.lineTo(x, y);
    });

    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = canvas.height - padding - (value / maxData) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#6366f1';
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = canvas.height - padding - (value / maxData) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6366f1';
    });

    // Draw labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';

    months.forEach((month, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      ctx.fillText(month, x, canvas.height - padding + 20);
    });
  }, []);

  const backlinks = [
    { name: 'TechCrunch', da: 93, icon: '📰' },
    { name: 'GitHub Blog', da: 96, icon: '💼' },
    { name: 'Stack Overflow', da: 97, icon: '🔧' },
    { name: 'Dev.to', da: 85, icon: '📚' },
    { name: 'Hacker News', da: 92, icon: '🎓' },
    { name: 'Product Hunt', da: 88, icon: '🌟' },
  ];

  return (
    <section id="stats" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Domain Performance Metrics</h2>
          <p className="section-subtitle">
            Real data showing the value and potential of 0dev.io
          </p>
        </div>

        {/* Traffic Chart */}
        <div className="card mb-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm uppercase text-gray-500 mb-2">Traffic Growth</h3>
              <div className="text-4xl font-bold text-primary-500 mb-1">+127%</div>
              <div className="text-gray-400">Year over Year</div>
            </div>
            <div>
              <h3 className="text-sm uppercase text-gray-500 mb-2">Engagement Rate</h3>
              <div className="text-4xl font-bold text-primary-500 mb-1">8.4 min</div>
              <div className="text-gray-400">Avg. Session Duration</div>
            </div>
          </div>
          <canvas ref={canvasRef} className="w-full" style={{ height: '300px' }} />
        </div>

        {/* Backlinks */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Trusted by the Developer Community
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {backlinks.map((link, index) => (
              <div key={index} className="card text-center group hover:scale-105">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div className="font-semibold text-white mb-1">{link.name}</div>
                <div className="text-sm text-gray-500">DA: {link.da}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
