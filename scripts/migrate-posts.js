require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Post Schema
const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: [{
    type: String,
  }],
});

const Post = mongoose.models?.Post || mongoose.model('Post', PostSchema);

const postsDirectory = path.join(process.cwd(), 'posts');

async function migratePosts() {
  console.log('Connecting to MongoDB...');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }

  console.log('Starting migration...');

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
      const post = new Post({
        slug,
        title: data.title || slug,
        content,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        tags: data.tags || []
      });

      await post.save();
      console.log(`Migrated: ${slug}`);
    } catch (error) {
      console.error(`Failed to migrate ${slug}:`, error);
    }
  }

  console.log('Migration complete!');
  await mongoose.disconnect();
}

// Run migration
migratePosts().catch(console.error);