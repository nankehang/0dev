import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global cache to prevent multiple connections in development
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
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

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export async function getPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ date: -1 });
    return posts.map(post => ({
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      date: post.date,
      tags: post.tags || []
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    await connectToDatabase();
    const post = await Post.findOne({ slug });
    if (!post) return null;
    return {
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      date: post.date,
      tags: post.tags || []
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function createPost(postData: { slug: string; title: string; content: string; excerpt?: string; tags?: string[] }) {
  try {
    await connectToDatabase();
    const post = new Post({
      slug: postData.slug,
      title: postData.title,
      content: postData.content,
      excerpt: postData.excerpt,
      tags: postData.tags || []
    });
    const savedPost = await post.save();
    return {
      slug: savedPost.slug,
      title: savedPost.title,
      content: savedPost.content,
      excerpt: savedPost.excerpt,
      date: savedPost.date,
      tags: savedPost.tags || []
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(slug: string, postData: { title: string; content: string; tags?: string[] }) {
  try {
    await connectToDatabase();
    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      {
        title: postData.title,
        content: postData.content,
        tags: postData.tags || []
      },
      { new: true }
    );
    if (!updatedPost) return null;
    return {
      slug: updatedPost.slug,
      title: updatedPost.title,
      content: updatedPost.content,
      excerpt: updatedPost.excerpt,
      date: updatedPost.date,
      tags: updatedPost.tags || []
    };
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(slug: string) {
  try {
    await connectToDatabase();
    await Post.findOneAndDelete({ slug });
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}