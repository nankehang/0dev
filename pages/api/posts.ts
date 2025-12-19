import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getPosts, createPost } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, {});

  if (req.method === 'GET') {
    // Public: Get all posts
    try {
      const posts = await getPosts();
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
      const { title, content, tags = [] } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const excerpt = content.substring(0, 150) + '...';

      const post = await createPost({
        slug,
        title,
        content,
        excerpt,
        tags
      });

      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
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
