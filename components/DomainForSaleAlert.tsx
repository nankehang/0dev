'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope, FaGlobe } from 'react-icons/fa';

const DomainForSaleAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if user has already seen the alert
    const alertShown = localStorage.getItem('domain-alert-shown');
    if (!alertShown) {
      // Show alert after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasBeenShown(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('domain-alert-shown', 'true');
    setHasBeenShown(true);
  };

  const handleContact = () => {
    window.location.href = 'mailto:khusanakihang@gmail.com?subject=Domain Purchase Inquiry - 0dev.io';
  };

  if (hasBeenShown || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-hacker-black border-2 border-hacker-red rounded-lg max-w-md w-full mx-4 shadow-2xl animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-hacker-red">
          <div className="flex items-center space-x-2">
            <FaGlobe className="text-hacker-red text-xl" />
            <h3 className="text-hacker-red font-mono font-bold text-lg">
              {'>'} DOMAIN_FOR_SALE
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-hacker-lightgray hover:text-hacker-red transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-hacker-red mb-2 animate-flicker">
              0DEV.IO
            </div>
            <p className="text-matrix-green font-mono text-sm">
              Premium developer domain available for purchase
            </p>
          </div>

          <div className="bg-hacker-darkgray border border-hacker-red rounded p-4">
            <h4 className="text-hacker-red font-mono font-bold mb-2 text-center">
              {'>'} WHY_THIS_DOMAIN
            </h4>
            <ul className="text-matrix-green font-mono text-xs space-y-1">
              <li>• Perfect for developer portfolios</li>
              <li>• Tech/security focused branding</li>
              <li>• Short, memorable, and unique</li>
              <li>• High SEO potential</li>
            </ul>
          </div>

          <div className="text-center space-y-3">
            <p className="text-hacker-lightgray font-mono text-sm">
              Interested in acquiring this domain?
            </p>

            <button
              onClick={handleContact}
              className="w-full bg-hacker-red text-black font-mono font-bold py-3 px-4 rounded hover:bg-hacker-darkred transition-colors flex items-center justify-center space-x-2"
            >
              <FaEnvelope />
              <span>CONTACT_OWNER</span>
            </button>

            <p className="text-hacker-lightgray font-mono text-xs">
              Email: khusanakihang@gmail.com
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <button
            onClick={handleClose}
            className="w-full text-hacker-lightgray font-mono text-xs hover:text-matrix-green transition-colors py-2"
          >
            [CONTINUE_TO_SITE]
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainForSaleAlert;