import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createPostsTable, createPost } from '../lib/db';

const postsDirectory = path.join(process.cwd(), 'posts');

async function migratePosts() {
  console.log('Starting migration...');

  // Ensure table exists
  await createPostsTable();

  if (!fs.existsSync(postsDirectory)) {
    console.log('No posts directory found');
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  console.log(`Found ${mdFiles.length} posts to migrate`);

  for (const fileName of mdFiles) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    try {
      await createPost({
        slug,
        title: data.title || slug,
        content,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        tags: data.tags || []
      });
      console.log(`Migrated: ${slug}`);
    } catch (error) {
      console.error(`Failed to migrate ${slug}:`, error);
    }
  }

  console.log('Migration complete!');
}

// Run migration
migratePosts().catch(console.error);