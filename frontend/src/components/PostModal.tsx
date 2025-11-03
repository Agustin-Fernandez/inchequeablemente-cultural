import type { Post } from '../types';

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  if (!post) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-5"
      onClick={handleBackdropClick}>
      <div className="bg-white rounded-xl max-w-[1200px] max-h-[90vh] w-full relative overflow-hidden shadow-2xl">
        <button
          className="absolute top-4 right-4 w-10 h-10 border-none bg-black/50 text-white text-[32px] leading-none cursor-pointer rounded-full flex items-center justify-center z-10 transition-colors hover:bg-black/70"
          onClick={onClose}>
          ×
        </button>

        <div className="flex max-h-[90vh] overflow-hidden max-md:flex-col">
          <div className="flex-1 bg-black flex items-center justify-center overflow-hidden max-md:max-h-[50vh]">
            <img
              src={`/uploads/${post.image_path}`}
              alt={post.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <div className="flex-[0_0_400px] p-8 overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 max-md:flex-1 max-md:max-h-[50vh]">
            <h2 className="mt-0 mb-5 text-2xl text-gray-800">{post.title}</h2>

            <div className="mb-6">
              <h3 className="mt-0 mb-2.5 text-gray-600 text-sm uppercase tracking-wider font-semibold">
                Descripción
              </h3>
              <p className="m-0 leading-relaxed text-gray-800 whitespace-pre-wrap">
                {post.description}
              </p>
            </div>

            {post.social_media_links && (
              <div className="mb-6">
                <h3 className="mt-0 mb-2.5 text-gray-600 text-sm uppercase tracking-wider font-semibold">
                  Redes Sociales
                </h3>
                <p className="m-0 leading-relaxed text-gray-800 whitespace-pre-wrap">
                  {post.social_media_links}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="mt-0 mb-2.5 text-gray-600 text-sm uppercase tracking-wider font-semibold">
                Publicado el
              </h3>
              <p className="m-0 leading-relaxed text-gray-800 whitespace-pre-wrap">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
