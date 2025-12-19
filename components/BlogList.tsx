import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaTag, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, selectedTag, posts]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags && post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  };

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading w-16 h-16 rounded-full mx-auto mb-4"></div>
          <p className="text-hacker-lightgray font-medium">Loading research notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="gradient-text text-5xl md:text-6xl font-bold mb-6 animate-flicker">
            RESEARCH NOTES
          </h1>
          <p className="text-xl text-hacker-lightgray max-w-2xl mx-auto leading-relaxed">
            Personal knowledge base and research documentation for modern development
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matrix-green" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input w-full text-lg"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedTag('')}
                className={`btn btn-ghost text-sm px-4 py-2 ${
                  selectedTag === '' ? 'bg-matrix-green/20 text-matrix-green' : ''
                }`}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`btn btn-ghost text-sm px-4 py-2 ${
                    selectedTag === tag ? 'bg-matrix-green/20 text-matrix-green' : ''
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-hacker-white mb-2">No notes found</h3>
            <p className="text-hacker-lightgray">
              Try different search terms or create a new research note
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="card group-hover:scale-[1.02] transition-all duration-500 relative min-h-[420px] flex flex-col">
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-matrix-green/30 group-hover:border-t-matrix-green transition-colors duration-300"></div>

                  {/* Header with title and date */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-hacker-white group-hover:text-matrix-green transition-all duration-300 mb-3 leading-tight group-hover:translate-x-1 transform">
                          {post.title}
                        </h2>
                        <div className="flex items-center space-x-2 text-sm text-hacker-lightgray mb-3">
                          <FaClock className="text-matrix-green w-3 h-3" />
                          <span className="font-mono">
                            {(() => {
                              try {
                                const date = new Date(post.date);
                                return isNaN(date.getTime()) ? 'Recent' : format(date, 'MMM dd, yyyy');
                              } catch {
                                return 'Recent';
                              }
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Excerpt with better styling */}
                    <div className="relative flex-1 mb-6">
                      <p className="text-hacker-lightgray text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                        {post.excerpt || 'No preview available'}
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-hacker-darkgray/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Tags section - pushed to bottom */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="text-xs bg-gradient-to-r from-matrix-green/20 to-accent-purple/20 text-matrix-green px-3 py-1.5 rounded-full font-medium border border-matrix-green/30 hover:border-matrix-green/60 transition-all duration-300 hover:scale-105 transform"
                          style={{ animationDelay: `${(index * 100) + (tagIndex * 50)}ms` }}
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-hacker-lightgray px-2 py-1.5 bg-hacker-gray/50 rounded-full border border-hacker-gray/50">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer with read more - always at bottom */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-hacker-gray/30">
                    <span className="text-matrix-green font-medium text-sm group-hover:text-accent-purple transition-all duration-300 flex items-center space-x-2">
                      <span>Read more</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-matrix-green rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-accent-purple rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-hacker-red rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>

                  {/* Subtle animated background pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-20 h-20 border border-matrix-green/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border border-accent-purple/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
