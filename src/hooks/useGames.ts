import useData from "./useData";
import { Genre } from "./useGenres";

//platform object

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
//definimos la interface de c/Game
export interface Game {
  id: number;
  name: string;
  background_image: string;
  //array of objects where each object has a platform property of type Platform
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatform: Platform | null
) =>
  // como selectedGenre puede ser null entonces ponemos selectedGenre?.id
  useData<Game>(
    "/games",
    {
      params: {
        genres: selectedGenre?.id,
        platforms: selectedPlatform?.id,
      },
    },
    [selectedGenre?.id, selectedPlatform?.id]
  );
export default useGames;
