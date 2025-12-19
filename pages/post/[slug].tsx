import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaClock, FaTag, FaArrowLeft, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useSession } from 'next-auth/react';
import PostSEO from '@/components/PostSEO';
import SocialShare from '@/components/SocialShare';

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: session } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setEditTitle(data.title || '');
        setEditContent(data.content || '');
        setEditTags(data.tags || []);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditTitle(post?.title || '');
    setEditContent(post?.content || '');
    setEditTags(post?.tags || []);
    setTagInput('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !editTags.includes(tagInput.trim())) {
      setEditTags([...editTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditTags(editTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('Title and content are required!');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
          tags: editTags,
        }),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPost(updatedPost);
        setEditing(false);
      } else {
        alert('Failed to update note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Error updating note');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/');
      } else {
        alert('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-hacker-black">
        <div className="text-hacker-red font-mono text-xl animate-pulse">
          <span className="animate-flicker">{'>'} LOADING_NOTE...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <PostSEO
        title={post.title}
        description={post.content?.substring(0, 160) || post.title}
        tags={post.tags || []}
        publishedTime={post.date}
        image="/og-image.png"
      />

      <div className="min-h-screen bg-hacker-black py-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-matrix-green hover:text-hacker-red transition-colors font-mono mb-6"
            >
              <FaArrowLeft />
              <span>[BACK_TO_NOTES]</span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-mono font-bold text-hacker-red mb-4 animate-flicker">
              {'>'} {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-hacker-lightgray font-mono mb-4">
              <span className="flex items-center space-x-2">
                <FaClock className="text-matrix-green" />
                <span>
                  {(() => {
                    try {
                      const date = new Date(post.date);
                      return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMMM dd, yyyy');
                    } catch {
                      return 'Invalid date';
                    }
                  })()}
                </span>
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center space-x-1 text-xs bg-hacker-darkgray border border-hacker-red text-hacker-red px-3 py-1 rounded font-mono"
                  >
                    <FaTag />
                    <span>#{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {session && (
              <div className="flex space-x-3 mb-6">
                {!editing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-hacker-darkgray text-matrix-green border border-hacker-red px-4 py-2 rounded font-mono hover:bg-hacker-red hover:text-black transition-colors"
                    >
                      <FaEdit />
                      <span>[EDIT]</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center space-x-2 bg-hacker-darkgray text-hacker-red border border-hacker-red px-4 py-2 rounded font-mono hover:bg-hacker-red hover:text-black transition-colors"
                    >
                      <FaTrash />
                      <span>[DELETE]</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      disabled={saving}
                      className="flex items-center space-x-2 bg-hacker-red text-black px-4 py-2 rounded font-mono hover:bg-hacker-darkred transition-colors disabled:opacity-50"
                    >
                      <FaSave />
                      <span>{saving ? '[SAVING...]' : '[SAVE]'}</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center space-x-2 bg-hacker-darkgray text-matrix-green border border-hacker-red px-4 py-2 rounded font-mono hover:bg-hacker-gray transition-colors"
                    >
                      <FaTimes />
                      <span>[CANCEL]</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Social Share */}
          <SocialShare
            url={`${typeof window !== 'undefined' ? window.location.origin : 'https://0dev.io'}/post/${post.slug}`}
            title={post.title}
            description={post.content?.substring(0, 160) || post.title}
          />

          {/* Content */}
          {editing ? (
            <div className="bg-hacker-darkgray border-2 border-hacker-red rounded-lg p-8 space-y-6">
              {/* Edit Title */}
              <div>
                <label className="block text-matrix-green font-mono mb-2">
                  {'>'} TITLE:
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-hacker-black border-2 border-hacker-red text-matrix-green px-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
                />
              </div>

              {/* Edit Tags */}
              <div>
                <label className="block text-matrix-green font-mono mb-2">
                  {'>'} TAGS:
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add tag and press Enter..."
                    className="flex-1 bg-hacker-black border-2 border-hacker-red text-matrix-green px-4 py-2 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-hacker-red text-black px-4 py-2 rounded font-mono hover:bg-hacker-darkred transition-colors"
                  >
                    [ADD]
                  </button>
                </div>
                {editTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editTags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center space-x-2 bg-hacker-black border border-hacker-red text-matrix-green px-3 py-1 rounded font-mono"
                      >
                        <FaTag className="text-hacker-red" />
                        <span>#{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-hacker-red hover:text-matrix-green ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Edit Content */}
              <div>
                <label className="block text-matrix-green font-mono mb-2">
                  {'>'} CONTENT:
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={20}
                  className="w-full bg-hacker-black border-2 border-hacker-red text-matrix-green px-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50 resize-y"
                />
                <p className="text-xs text-hacker-lightgray font-mono mt-2">
                  // Markdown supported: **bold**, *italic*, `code`, ```code blocks```, # headings, - lists
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-hacker-darkgray border-2 border-hacker-red rounded-lg p-8">
              <div className="prose prose-invert prose-green max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-mono font-bold text-hacker-red mb-4 mt-8 first:mt-0">
                        {'>'} {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-mono font-bold text-hacker-red mb-3 mt-6">
                        {'>>'} {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-mono font-bold text-matrix-green mb-2 mt-4">
                        {'>>>'} {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-matrix-green font-mono mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    code: ({ inline, children }: any) =>
                      inline ? (
                        <code className="bg-hacker-black text-hacker-red px-2 py-1 rounded font-mono text-sm">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-hacker-black text-matrix-green p-4 rounded font-mono text-sm overflow-x-auto border border-hacker-red/30">
                          {children}
                        </code>
                      ),
                    pre: ({ children }) => <pre className="my-4">{children}</pre>,
                    ul: ({ children }) => (
                      <ul className="list-none space-y-2 mb-4 ml-4">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-matrix-green font-mono">
                        <span className="text-hacker-red mr-2">{'>'}</span>
                        {children}
                      </li>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-hacker-red hover:text-matrix-green underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-hacker-red pl-4 italic text-hacker-lightgray my-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content || 'No content available'}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t-2 border-hacker-red">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-matrix-green hover:text-hacker-red transition-colors font-mono"
            >
              <FaArrowLeft />
              <span>[BACK_TO_ALL_NOTES]</span>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
