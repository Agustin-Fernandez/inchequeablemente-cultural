import { useState } from 'react';
import { createPost } from '../api';
import type { Post } from '../types';

interface PostFormProps {
  onPostCreated: (post: Post) => void;
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setError('Título, descripción e imagen son requeridos');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('socialMediaLinks', socialMediaLinks);
      formData.append('image', image);

      const newPost = await createPost(formData);
      onPostCreated(newPost);

      // Reset form
      setTitle('');
      setDescription('');
      setSocialMediaLinks('');
      setImage(null);
      setPreviewUrl('');
    } catch (err) {
      setError('Error al crear la publicación. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full p-5 overflow-y-auto">
      <h2 className="mt-0 mb-5 text-xl font-semibold text-gray-800">Crear Nueva Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 font-semibold text-gray-600">
            Título *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="¡Contanos dónde estuviste!"
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 font-semibold text-gray-600">
            Descripción *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Contanos más..."
            rows={4}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="socialMedia" className="block mb-2 font-semibold text-gray-600">
            Redes Sociales
          </label>
          <input
            id="socialMedia"
            type="text"
            value={socialMediaLinks}
            onChange={e => setSocialMediaLinks(e.target.value)}
            placeholder="Tu instagram así te encontramos"
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="block mb-2 font-semibold text-gray-600">
            Imagen *
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-2 py-2 border border-gray-300 rounded"
          />
          {previewUrl && (
            <div className="mt-2.5 border border-gray-300 rounded overflow-hidden max-w-full">
              <img src={previewUrl} alt="Preview" className="block w-full h-auto" />
            </div>
          )}
        </div>

        {error && <div className="text-red-700 bg-red-50 px-3 py-2.5 rounded mb-4">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-3 py-3 text-base font-semibold text-white transition-colors bg-orange-400 border-none rounded cursor-pointer hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {isSubmitting ? 'Creando...' : 'Crear Publicación'}
        </button>
      </form>
    </div>
  );
}
