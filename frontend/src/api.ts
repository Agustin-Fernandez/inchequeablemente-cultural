import type { Post } from './types';
import img1 from '/img1.png';
import img2 from '/img2.png';
import img3 from '/img3.png';
import img4 from '/img4.png';
import img5 from '/img5.png';

// const API_BASE = '/api';
//
// export const fetchPosts = async (): Promise<Post[]> => {
//   const response = await fetch(`${API_BASE}/posts`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch posts');
//   }
//   return response.json();
// };
//
// export const createPost = async (formData: FormData): Promise<Post> => {
//   const response = await fetch(`${API_BASE}/posts`, {
//     method: 'POST',
//     body: formData,
//   });
//
//   if (!response.ok) {
//     throw new Error('Failed to create post');
//   }
//
//   return response.json();
// };

// MOCK API IMPLEMENTATION
export const fetchPosts = async (): Promise<Post[]> => {
  return [
    {
      id: 1,
      title: 'PokéFan Fest en San Nicolás',
      description:
        'Fui con mi hijo a la PokéFan Fest en San Nicolás de los Arroyos y todavía seguimos hablando del día. Había stands con cartas, juegos, competencias y hasta un par de artistas que hacían dibujos en vivo. Lo que más disfrutó mi hijo fue el torneo de trivia (se sabía todas las respuestas jajaja). El evento estaba muy bien organizado. Si lo vuelven a hacer, seguro volvemos.',
      image_path: img1,
      social_media_links: '@inchequeablementecultural',
      created_at: '2024-06-15T10:00:00Z',
    },
    {
      id: 2,
      title: 'Varieté artística en Festbar',
      description:
        'Anoche me di una vuelta por Festbar, en Villa Constitución, para ver una “varieté artística” que me habían recomendado, y la verdad fue una sorpresa enorme. Arrancaron con un grupo de folclore que metió unas chacareras tremendas, después subió una chica con temas pop y una voz increíble, y más cosas. Lo lindo fue la mezcla, tipo nadie competía con nadie, cada presentación sumaba algo distinto. Entre tema y tema, la gente charlaba, se reía, aplaudía con ganas.',
      image_path: img2,
      social_media_links: '@inchequeablementecultural',
      created_at: '2024-06-14T18:30:00Z',
    },
    {
      id: 3,
      title: 'Hikari Fest en Villa Constitución',
      description:
        'Fui al Hikari Fest en Villa Constitución, con mi cosplay de Boba Fett (con casco, jetpack y todo) y fue una experiencia genial. Apenas llegué, ya me crucé con un montón de cosplayers de anime y juegos, así que me sentí en casa jajaj. El evento arrancó a eso de las 13hs con la apertura, y enseguida hubo un concurso de cosplay para chicos que fue una ternura total. La organización impecable, los stands con productos buenísimos. me lleve mil stickers jaja.',
      image_path: img3,
      social_media_links: '@inchequeablementecultural',
      created_at: '2024-06-13T14:00:00Z',
    },
    {
      id: 4,
      title: 'SNStreetball 3vs3 en la Plaza de la Radio',
      description:
        'Este finde jugué en el SNStreetball 3vs3 en la Plaza de la Radio, en San Nicolás, y fue una locura total. El sol pegaba re fuerte, capaz que por eso la re vivimos con mis amigos jajaja. perdimos en semi final… una lástima, hubiese estado copado ganar el premio.',
      image_path: img4,
      social_media_links: '@inchequeablementecultural',
      created_at: '2024-06-12T16:00:00Z',
    },
    {
      id: 5,
      title: 'Loto Freestyle en la plaza del Cementerio',
      description:
        'Soy uno de los que organiza Loto Freestyle, y todavía estoy procesando lo que fue la última fecha. La hicimos en la plaza del Cementerio, la compe estuvo tremenda: mucho nivel, punchlines afilados y una final re picada. Esta edición tuvo un incentivo fuerte, $50.000 en premio, gracias al apoyo de varios comercios locales y, encima, una producción de Rakyah',
      image_path: img5,
      social_media_links: '@inchequeablementecultural',
      created_at: '2024-06-11T19:00:00Z',
    },
  ];
};

export const createPost = async (formData: FormData): Promise<Post> => {
  return {
    id: 9999,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_path: formData.get('image_path') as string,
    social_media_links: formData.get('social_media_links') as string,
    created_at: new Date().toISOString(),
  };
};
