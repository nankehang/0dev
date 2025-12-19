import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getPost, updatePost, deletePost } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const session = await getServerSession(req, res, {});

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  if (req.method === 'GET') {
    // Public: Get single post
    try {
      const post = await getPost(slug);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load post' });
    }
  } else if (req.method === 'PUT') {
    // Protected: Update post
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { title, content, tags } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const updatedPost = await updatePost(slug, {
        title,
        content,
        tags: tags || []
      });

      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else if (req.method === 'DELETE') {
    // Protected: Delete post
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      await deletePost(slug);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
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
