import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaSave, FaTimes, FaTag } from 'react-icons/fa';

const NoteEditor: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required!');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, tags }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/post/${data.slug}`);
      } else {
        alert('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Error saving note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-hacker-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-mono font-bold text-hacker-red animate-flicker">
            {'>'} NEW_RESEARCH_NOTE
          </h1>
          <button
            onClick={() => router.back()}
            className="text-matrix-green hover:text-hacker-red transition-colors font-mono flex items-center space-x-2"
          >
            <FaTimes />
            <span>[CANCEL]</span>
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-matrix-green font-mono mb-2">
            {'>'} TITLE:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full bg-hacker-darkgray border-2 border-hacker-red text-matrix-green px-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
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
              className="flex-1 bg-hacker-darkgray border-2 border-hacker-red text-matrix-green px-4 py-2 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50"
            />
            <button
              onClick={handleAddTag}
              className="bg-hacker-red text-black px-4 py-2 rounded font-mono hover:bg-hacker-darkred transition-colors"
            >
              [ADD]
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center space-x-2 bg-hacker-darkgray border border-hacker-red text-matrix-green px-3 py-1 rounded font-mono"
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

        {/* Content Editor */}
        <div className="mb-6">
          <label className="block text-matrix-green font-mono mb-2">
            {'>'} CONTENT:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your research notes in Markdown format..."
            rows={20}
            className="w-full bg-hacker-darkgray border-2 border-hacker-red text-matrix-green px-4 py-3 rounded font-mono focus:outline-none focus:border-hacker-red focus:ring-2 focus:ring-hacker-red/50 resize-y"
          />
          <p className="text-xs text-hacker-lightgray font-mono mt-2">
            // Markdown supported: **bold**, *italic*, `code`, ```code blocks```, # headings, - lists
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.back()}
            className="bg-hacker-darkgray text-matrix-green border-2 border-hacker-red px-6 py-3 rounded font-mono hover:bg-hacker-gray transition-colors"
          >
            [CANCEL]
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-hacker-red text-black px-6 py-3 rounded font-mono hover:bg-hacker-darkred transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <FaSave />
            <span>{saving ? '[SAVING...]' : '[SAVE_NOTE]'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
