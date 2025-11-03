import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, '../database.db'));

// Create posts table
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_path TEXT NOT NULL,
    social_media_links TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Post {
  id: number;
  title: string;
  description: string;
  image_path: string;
  social_media_links: string;
  created_at: string;
}

export interface NewPost {
  title: string;
  description: string;
  image_path: string;
  social_media_links?: string;
}

export const createPost = (post: NewPost): Post => {
  const stmt = db.prepare(`
    INSERT INTO posts (title, description, image_path, social_media_links)
    VALUES (?, ?, ?, ?)
  `);

  const info = stmt.run(
    post.title,
    post.description,
    post.image_path,
    post.social_media_links || ''
  );

  return getPostById(info.lastInsertRowid as number)!;
};

export const getAllPosts = (): Post[] => {
  const stmt = db.prepare('SELECT * FROM posts ORDER BY created_at DESC');
  return stmt.all() as Post[];
};

export const getPostById = (id: number): Post | undefined => {
  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  return stmt.get(id) as Post | undefined;
};

export default db;
