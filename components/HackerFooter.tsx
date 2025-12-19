import React from 'react';

const HackerFooter: React.FC = () => {
  return (
    <footer className="bg-hacker-black border-t-2 border-hacker-red py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-matrix-green font-mono mb-4 md:mb-0">
            <p className="text-sm">
              <span className="text-hacker-red">{'>'}</span> 0dev.io_research_notes
            </p>
            <p className="text-xs mt-1 text-hacker-lightgray">
              // Personal knowledge base © 2025
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="mailto:khusanakihang@gmail.com"
              className="text-matrix-green hover:text-hacker-red transition-colors font-mono text-sm"
            >
              [CONTACT]
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-matrix-green hover:text-hacker-red transition-colors font-mono text-sm"
            >
              [GITHUB]
            </a>
          </div>
        </div>

        {/* Matrix-style loading bar */}
        <div className="mt-6 h-1 bg-hacker-darkgray rounded overflow-hidden">
          <div className="h-full bg-gradient-to-r from-hacker-red via-matrix-green to-hacker-red animate-pulse-glow"></div>
        </div>
      </div>
    </footer>
  );
};

export default HackerFooter;
