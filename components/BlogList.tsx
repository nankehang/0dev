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
              className="input-modern w-full pl-12 pr-4 py-4 text-lg"
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group"
              >
                <article className="card group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-hacker-white group-hover:text-matrix-green transition-colors mb-2 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-hacker-lightgray text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt || 'No preview available'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-hacker-lightgray mb-4">
                    <span className="flex items-center space-x-2">
                      <FaClock className="text-matrix-green w-4 h-4" />
                      <span>
                        {(() => {
                          try {
                            const date = new Date(post.date);
                            return isNaN(date.getTime()) ? 'Recent' : format(date, 'MMM dd, yyyy');
                          } catch {
                            return 'Recent';
                          }
                        })()}
                      </span>
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs bg-matrix-green/20 text-matrix-green px-2 py-1 rounded-full">
                        {post.tags.length} topic{post.tags.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-hacker-lightgray px-2 py-1">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-matrix-green font-medium text-sm group-hover:text-accent-purple transition-colors">
                      Read more →
                    </span>
                    <div className="w-2 h-2 bg-matrix-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
