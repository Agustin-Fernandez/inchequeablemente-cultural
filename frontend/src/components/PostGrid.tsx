import type { Post } from '../types';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export default function PostGrid({ posts, onPostClick }: PostGridProps) {
  return (
    <div className="p-5 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {posts.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400 text-lg">
          ¡Vaca-yendo gente al baile!
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {posts.map(post => (
            <div
              key={post.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl"
              onClick={() => onPostClick(post)}>
              <img
                src={`/uploads/${post.image_path}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-5 text-white">
                <span className="block text-base font-semibold">{post.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
