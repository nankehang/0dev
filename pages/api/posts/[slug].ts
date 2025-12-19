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
  const { slug } = req.query;
  const session = await getServerSession(req, res, {});

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (req.method === 'GET') {
    // Public: Get single post
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      res.status(200).json({
        slug,
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        content,
      });
    } catch (error) {
      res.status(404).json({ error: 'Post not found' });
    }
  } else if (req.method === 'PUT') {
    // Protected: Update post
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { title, content, tags } = req.body;

      const frontmatter = {
        title,
        date: new Date().toISOString(),
        tags: tags || [],
        excerpt: content.substring(0, 150) + '...',
      };

      const fileContent = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, fileContent);

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else if (req.method === 'DELETE') {
    // Protected: Delete post
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
