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
      <div className="flex items-center justify-center min-h-screen bg-hacker-black">
        <div className="text-hacker-red font-mono text-xl animate-pulse">
          <span className="animate-flicker">{'>'} LOADING_NOTES...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hacker-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-hacker-red mb-4 animate-flicker">
            {'>'} RESEARCH_NOTES
          </h1>
          <p className="text-matrix-green font-mono">
            // Personal knowledge base and research documentation
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-hacker-red" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-hacker-darkgray border-2 border-hacker-red text-matrix-green pl-12 pr-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded font-mono text-sm transition-colors ${
                  selectedTag === ''
                    ? 'bg-hacker-red text-black'
                    : 'bg-hacker-darkgray text-matrix-green border border-hacker-red hover:bg-hacker-red hover:text-black'
                }`}
              >
                [ALL]
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded font-mono text-sm transition-colors ${
                    selectedTag === tag
                      ? 'bg-hacker-red text-black'
                      : 'bg-hacker-darkgray text-matrix-green border border-hacker-red hover:bg-hacker-red hover:text-black'
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
            <p className="text-matrix-green font-mono text-xl">
              {'>'} NO_NOTES_FOUND
            </p>
            <p className="text-hacker-lightgray font-mono text-sm mt-2">
              // Try different search terms or create a new note
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group"
              >
                <article className="bg-hacker-darkgray border-2 border-hacker-red p-6 rounded hover:border-matrix-green transition-all hover:shadow-lg hover:shadow-hacker-red/20">
                  <h2 className="text-xl font-mono font-bold text-hacker-red group-hover:text-matrix-green transition-colors mb-3">
                    {'>'} {post.title}
                  </h2>

                  <div className="flex items-center space-x-4 text-xs text-hacker-lightgray font-mono mb-3">
                    <span className="flex items-center space-x-1">
                      <FaClock className="text-matrix-green" />
                      <span>
                        {(() => {
                          try {
                            const date = new Date(post.date);
                            return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMM dd, yyyy');
                          } catch {
                            return 'Invalid date';
                          }
                        })()}
                      </span>
                    </span>
                  </div>

                  <p className="text-sm text-matrix-green font-mono mb-4 line-clamp-3">
                    {post.excerpt || 'No excerpt available'}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center space-x-1 text-xs bg-hacker-black border border-hacker-red text-hacker-red px-2 py-1 rounded font-mono"
                        >
                          <FaTag />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-hacker-red/30">
                    <span className="text-matrix-green font-mono text-sm group-hover:text-hacker-red transition-colors">
                      [READ_MORE] →
                    </span>
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
