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
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="gradient-text text-4xl font-bold mb-2">
              Create New Research Note
            </h1>
            <p className="text-hacker-lightgray">Document your findings and insights</p>
          </div>
          <button
            onClick={() => router.back()}
            className="btn btn-secondary"
          >
            <FaTimes className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-8">
          <label className="block text-hacker-white font-semibold mb-3 text-lg">
            Note Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title for your research note..."
            className="input-modern w-full text-lg py-4"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label className="block text-hacker-white font-semibold mb-3 text-lg">
            Topics & Tags
          </label>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a topic and press Enter..."
              className="input-modern flex-1"
            />
            <button
              onClick={handleAddTag}
              className="btn btn-primary px-6"
            >
              <FaTag className="w-4 h-4 mr-2" />
              Add Tag
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 bg-accent-purple/20 text-accent-purple px-4 py-2 rounded-full font-medium"
                >
                  <FaTag className="w-3 h-3" />
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-hacker-red transition-colors ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div className="mb-8">
          <label className="block text-hacker-white font-semibold mb-3 text-lg">
            Research Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your research notes in Markdown format...

# Headings
## Subheadings

**Bold text** and *italic text*

- Bullet points
- More items

`inline code`

```
Code blocks
```

> Blockquotes

[Links](https://example.com)"
            rows={25}
            className="input-modern w-full text-base leading-relaxed resize-y"
          />
          <div className="mt-3 text-sm text-hacker-lightgray">
            <p className="font-medium mb-2">Markdown formatting supported:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span><code className="bg-hacker-gray/50 px-1 rounded">**bold**</code> → <strong>bold</strong></span>
              <span><code className="bg-hacker-gray/50 px-1 rounded">*italic*</code> → <em>italic</em></span>
              <span><code className="bg-hacker-gray/50 px-1 rounded">`code`</code> → <code className="bg-hacker-gray/50 px-1 rounded">code</code></span>
              <span><code className="bg-hacker-gray/50 px-1 rounded"># Heading</code> → Heading</span>
              <span><code className="bg-hacker-gray/50 px-1 rounded">- List</code> → • List</span>
              <span><code className="bg-hacker-gray/50 px-1 rounded">[Link](url)</code> → Link</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-hacker-gray/30">
          <button
            onClick={() => router.back()}
            className="btn btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim() || !content.trim()}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            <FaSave className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Research Note'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
