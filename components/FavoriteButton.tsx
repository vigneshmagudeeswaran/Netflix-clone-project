// // import axios from 'axios'
// // import React, { useCallback, useMemo } from 'react'

// // import useCurrentUser from '../hooks/useCurrentUser'
// // import useFavorites from '../hooks/useFavorites'
// // import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

// // interface FavoriteButtonProps{
// //     movieId:string
// // }

// // const favoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
// //     const { mutate:mutateFavorites } = useFavorites();
// //     const { data: currentUser, mutate } = useCurrentUser();

// //     const isFavorite = useMemo(() => {
// //         const list = currentUser?.favoriteIds || [];

// //         return list.includes(movieId)
// //     }, [currentUser, movieId])

// //     const toggleFavorites = useCallback(async () => {
// //         let response;
// //         if (isFavorite) {
// //             response = await axios.delete('/api/favorite', {data:{movieId}})
// //         } else {
// //             response = await axios.post("/api/favorite", { movieId });
// //         }

// //         const updatedFavoriteIds = response?.data?.favoriteIds
// //         mutate({
// //             ...currentUser,
// //         favoriteIds: updatedFavoriteIds
// //         });
// //         mutateFavorites();
// //     }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

// //    const Icon = isFavorite ? AiOutlineCheck :AiOutlinePlus
// //     return (
// //         <div onClick={toggleFavorites} className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
// //             <Icon className='text-white' size={25} />
// //         </div>
// //     )
// // }

// // export default favoriteButton;

// import axios from "axios";
// import React, { useCallback, useMemo } from "react";
// import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

// import useCurrentUser from "@/hooks/useCurrentUser";
// import useFavorites from "@/hooks/useFavorites";

// interface FavoriteButtonProps {
//   movieId: string;
// }

// const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
//   const { mutate: mutateFavorites } = useFavorites();

//   const { data: currentUser, mutate } = useCurrentUser();

//   const isFavorite = useMemo(() => {
//     const list = currentUser?.favoriteIds || [];

//     return list.includes(movieId);
//   }, [currentUser, movieId]);

//   const toggleFavorites = useCallback(async () => {
//     let response;

//     if (isFavorite) {
//       response = await axios.delete("/api/favorite", { data: { movieId } });
//     } else {
//       response = await axios.post("/api/favorite", { movieId });
//     }

//     const updatedFavoriteIds = response?.data?.favoriteIds;

//     mutate({
//       ...currentUser,
//       favoriteIds: updatedFavoriteIds,
//     });
//     mutateFavorites();
//   }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

//   const Icon = isFavorite ? CheckIcon : PlusIcon;

//   return (
//     <div
//       onClick={toggleFavorites}
//       className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
//     >
//       <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
//     </div>
//   );
// };

// export default FavoriteButton;

import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  console.log("movieID", movieId);
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);
    
    // const toggle = async () => { await axios.post("/api/favorite", movieId) };

    const toggle = async () => {
      try {
        await axios.post("/api/favorite", movieId);
      } catch (error) {
        // Check if the error is an AxiosError
        if (axios.isAxiosError(error)) {
          console.error(
            "Request failed with status code",
            error.response?.status
          );
          console.error("Error message:", error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };


  const toggleFavorites = useCallback(async() => {
    // let response;
      const postreq = await axios.post("/api/favorite", movieId);
      console.log("postreq",postreq)
    // if (isFavorite) {
    //   response = await axios.delete("/api/favorite", { data: movieId  });
    // } else {
    //   console.log("response", response);
    //   response = await axios.post("/api/favorite",  movieId );
    // }

    // const updatedFavoriteIds = response?.data?.favoriteIds;

    // mutate({
    //   ...currentUser,
    //   favoriteIds: updatedFavoriteIds,
    // });
    // mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggle}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
