import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { createPost, getAllPosts } from './database';
import sharp from 'sharp';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Configure multer for file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Compress image after upload
export const compressImage = async (filePath: string): Promise<void> => {
  const MAX_SIZE = 500 * 1024; // 500KB
  let quality = 90;

  while (quality > 10) {
    await sharp(filePath)
      .jpeg({ quality, progressive: true })
      .toFile(filePath + '.tmp');

    const stats = await fs.stat(filePath + '.tmp');

    if (stats.size <= MAX_SIZE) {
      await fs.rename(filePath + '.tmp', filePath);
      return;
    }

    await fs.unlink(filePath + '.tmp');
    quality -= 10;
  }

  // Final attempt at lowest quality
  await sharp(filePath)
    .jpeg({ quality: 10, progressive: true })
    .toFile(filePath + '.tmp');
  await fs.rename(filePath + '.tmp', filePath);
};

// Routes
app.get('/api/posts', (req: Request, res: Response) => {
  try {
    const posts = getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const { title, description, socialMediaLinks } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const post = createPost({
      title,
      description,
      image_path: req.file.filename,
      social_media_links: socialMediaLinks || '',
    });

    compressImage(req.file.path).catch(err => {
      console.error('Error compressing image:', err);
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
