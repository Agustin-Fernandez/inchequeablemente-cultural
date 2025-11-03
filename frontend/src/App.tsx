import { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostGrid from './components/PostGrid';
import PostModal from './components/PostModal';
import { fetchPosts } from './api';
import type { Post } from './types';
import logo from "/logo.png";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      setError('Error cargando publicaciones.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();

    // Poll for new posts every 5 seconds
    const interval = setInterval(() => {
      fetchPosts().then(setPosts).catch(console.error);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="px-5 py-5 text-white bg-orange-400 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Inchequeablemente Cultural Logo"
              className="object-contain w-10 h-10"
            />
            <h1 className="text-3xl tracking-wide" style={{ fontFamily: 'Sigmar, cursive' }}>
              Rincón Inchequeable
            </h1>
          </div>

          <div className="flex items-center gap-10">
            <a
              href="https://www.youtube.com/@mundotransversal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition bg-white rounded-full hover:scale-105"
              aria-label="YouTube">
              <img
                src="https://imgs.search.brave.com/6Oz4BWzqNzDYegWEjMNITP0NWiWKxe5dNDT1sSuas6w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMzgzLzEzODMy/NjAucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                alt="YouTube"
                className="w-8 h-8"
              />
            </a>

            <a
              href="https://www.instagram.com/inchequeablementecultural/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition bg-white rounded-full hover:scale-105"
              aria-label="Instagram">
              <img
                src="https://imgs.search.brave.com/TS5LQJQqKrWcEjwHHoAPbDrbbQc-LL2ajBgpIocLLEk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8yMTExLzIxMTE0/MjEucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>

            <a
              href="https://www.tiktok.com/@inchequeablemente6"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition bg-white rounded-full hover:scale-105"
              aria-label="TikTok">
              <img
                src="https://imgs.search.brave.com/P9O78B8cbQj_7Rsqo8u1BIyPUTc9wJgpMuFGYdmW0R0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8zNTc4LzM1Nzg5/MDMucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                alt="TikTok"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-col flex-1 overflow-hidden md:flex-row">
        <aside className="w-full md:w-[400px] border-r md:border-r border-b md:border-b-0 border-gray-300 bg-gray-50 overflow-y-auto md:max-h-full max-h-[40vh]">
          <PostForm onPostCreated={handlePostCreated} />
        </aside>

        <main className="flex-1 overflow-hidden bg-white">
          {loading ? (
            <div className="flex items-center justify-center h-full text-lg text-gray-600">
              Cargando imágenes...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-lg text-red-600">
              {error}
            </div>
          ) : (
            <PostGrid posts={posts} onPostClick={setSelectedPost} />
          )}
        </main>
      </div>

      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}

export default App;
