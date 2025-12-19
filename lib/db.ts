import { sql } from '@vercel/postgres';

export async function createPostsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tags TEXT[] DEFAULT '{}'
      );
    `;
  } catch (error) {
    console.error('Error creating posts table:', error);
  }
}

export async function getPosts() {
  try {
    const { rows } = await sql`SELECT * FROM posts ORDER BY date DESC`;
    return rows.map(row => ({
      ...row,
      tags: row.tags || []
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const { rows } = await sql`SELECT * FROM posts WHERE slug = ${slug}`;
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      ...row,
      tags: row.tags || []
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function createPost(post: { slug: string; title: string; content: string; excerpt?: string; tags?: string[] }) {
  try {
    const { rows } = await sql`
      INSERT INTO posts (slug, title, content, excerpt, tags)
      VALUES (${post.slug}, ${post.title}, ${post.content}, ${post.excerpt || ''}, ${post.tags || []})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(slug: string, post: { title: string; content: string; tags?: string[] }) {
  try {
    const { rows } = await sql`
      UPDATE posts
      SET title = ${post.title}, content = ${post.content}, tags = ${post.tags || []}
      WHERE slug = ${slug}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(slug: string) {
  try {
    await sql`DELETE FROM posts WHERE slug = ${slug}`;
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}