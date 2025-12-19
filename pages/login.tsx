import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaUserSecret, FaLock, FaTerminal } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Access denied.');
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - 0dev.io</title>
      </Head>

      <div className="min-h-screen bg-hacker-black flex items-center justify-center px-4">
        {/* Matrix Rain Effect Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="matrix-rain"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Terminal Window */}
          <div className="bg-hacker-darkgray border-2 border-hacker-red rounded-lg overflow-hidden shadow-2xl shadow-hacker-red/20">
            {/* Terminal Header */}
            <div className="bg-hacker-black border-b-2 border-hacker-red px-4 py-3 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-hacker-red animate-pulse-glow"></div>
                <div className="w-3 h-3 rounded-full bg-hacker-lightgray"></div>
                <div className="w-3 h-3 rounded-full bg-hacker-lightgray"></div>
              </div>
              <span className="text-matrix-green font-mono text-sm ml-4">
                terminal@0dev.io
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <FaTerminal className="text-hacker-red text-5xl animate-pulse-glow" />
              </div>

              <h1 className="text-2xl font-mono font-bold text-hacker-red text-center mb-2 animate-flicker">
                {'>'} ACCESS_CONTROL
              </h1>
              <p className="text-matrix-green font-mono text-sm text-center mb-8">
                // Authentication required
              </p>

              {error && (
                <div className="bg-hacker-red/10 border border-hacker-red text-hacker-red px-4 py-3 rounded font-mono text-sm mb-6">
                  <span className="font-bold">ERROR:</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-matrix-green font-mono text-sm mb-2">
                    {'>'} USERNAME:
                  </label>
                  <div className="relative">
                    <FaUserSecret className="absolute left-4 top-1/2 transform -translate-y-1/2 text-hacker-red" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full bg-hacker-black border-2 border-hacker-red text-matrix-green pl-12 pr-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-matrix-green font-mono text-sm mb-2">
                    {'>'} PASSWORD:
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-hacker-red" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-hacker-black border-2 border-hacker-red text-matrix-green pl-12 pr-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-hacker-red text-black py-3 rounded font-mono font-bold hover:bg-hacker-darkred transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '[AUTHENTICATING...]' : '[GRANT_ACCESS]'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="text-matrix-green hover:text-hacker-red transition-colors font-mono text-sm"
                >
                  {'<'} [BACK_TO_NOTES]
                </button>
              </div>

              {/* System Info */}
              <div className="mt-8 pt-6 border-t border-hacker-red/30">
                <p className="text-xs text-hacker-lightgray font-mono text-center">
                  Default: admin / hacker2024
                </p>
                <p className="text-xs text-hacker-lightgray font-mono text-center mt-1">
                  // Change credentials in .env.local
                </p>
              </div>
            </div>
          </div>

          {/* Glowing effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-hacker-red via-matrix-green to-hacker-red rounded-lg blur opacity-20 -z-10 animate-pulse-glow"></div>
        </div>
      </div>
    </>
  );
}
