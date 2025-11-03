import type { Post } from '../types';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export default function PostGrid({ posts, onPostClick }: PostGridProps) {
  return (
    <div className="h-full p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {posts.length === 0 ? (
        <div className="flex items-center justify-center h-full text-lg text-gray-400">
          ¡Vaca-yendo gente al baile!
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {posts.map(post => (
            <div
              key={post.id}
              className="relative overflow-hidden transition-all duration-300 rounded-lg shadow-md cursor-pointer aspect-square hover:-translate-y-1 hover:shadow-xl"
              onClick={() => onPostClick(post)}>
              <img
                //src={`/uploads/${post.image_path}`}
                src={post.image_path}
                alt={post.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 pt-5 pb-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                <span className="block text-base font-semibold">{post.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
