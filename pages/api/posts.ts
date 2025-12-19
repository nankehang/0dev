import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, {});

  if (req.method === 'GET') {
    // Public: Get all posts
    try {
      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
      }

      const fileNames = fs.readdirSync(postsDirectory);
      const posts = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString(),
            tags: data.tags || [],
            excerpt: data.excerpt || content.substring(0, 150) + '...',
          };
        })
        .sort((a, b) => (a.date > b.date ? -1 : 1));

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load posts' });
    }
  } else if (req.method === 'POST') {
    // Protected: Create new post
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { title, content, tags } = req.body;
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const frontmatter = {
        title,
        date: new Date().toISOString(),
        tags: tags || [],
        excerpt: content.substring(0, 150) + '...',
      };

      const fileContent = matter.stringify(content, frontmatter);
      const filePath = path.join(postsDirectory, `${slug}.md`);

      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
      }

      fs.writeFileSync(filePath, fileContent);

      res.status(201).json({ slug, message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
