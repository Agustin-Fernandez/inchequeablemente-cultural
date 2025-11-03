import type { Post } from './types';

const API_BASE = '/api';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export const createPost = async (formData: FormData): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};
