'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaTerminal, FaUserSecret, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';

const HackerNavbar: React.FC = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hacker-black border-b-2 border-hacker-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <FaTerminal className="text-hacker-red text-2xl animate-pulse-glow" />
            <span className="text-2xl font-mono font-bold text-hacker-red animate-flicker">
              0dev.io
            </span>
            <span className="text-xs font-mono text-matrix-green">v2.0</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-matrix-green hover:text-hacker-red transition-colors font-mono"
            >
              [NOTES]
            </Link>
            <Link
              href="/my-vision"
              className="text-matrix-green hover:text-hacker-red transition-colors font-mono"
            >
              [MY_VISION]
            </Link>
            {session ? (
              <>
                <Link
                  href="/editor"
                  className="flex items-center space-x-2 bg-hacker-red text-black px-4 py-2 rounded hover:bg-hacker-darkred transition-colors font-mono"
                >
                  <FaPlusCircle />
                  <span>NEW_NOTE</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-matrix-green hover:text-hacker-red transition-colors font-mono"
                >
                  <FaSignOutAlt />
                  <span>[LOGOUT]</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-hacker-darkgray text-hacker-red px-4 py-2 rounded border border-hacker-red hover:bg-hacker-red hover:text-black transition-colors font-mono"
              >
                <FaUserSecret />
                <span>[LOGIN]</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-hacker-red"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="block h-0.5 w-6 bg-hacker-red"></span>
              <span className="block h-0.5 w-6 bg-hacker-red"></span>
              <span className="block h-0.5 w-6 bg-hacker-red"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-hacker-red mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-matrix-green hover:text-hacker-red transition-colors font-mono"
              >
                [NOTES]
              </Link>
              <Link
                href="/my-vision"
                className="text-matrix-green hover:text-hacker-red transition-colors font-mono"
              >
                [MY_VISION]
              </Link>
              {session ? (
                <>
                  <Link
                    href="/editor"
                    className="text-hacker-red hover:text-matrix-green transition-colors font-mono"
                  >
                    [NEW_NOTE]
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-left text-matrix-green hover:text-hacker-red transition-colors font-mono"
                  >
                    [LOGOUT]
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-hacker-red hover:text-matrix-green transition-colors font-mono"
                >
                  [LOGIN]
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Scan Line Effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hacker-red to-transparent opacity-20 animate-scan pointer-events-none"></div>
    </nav>
  );
};

export default HackerNavbar;
