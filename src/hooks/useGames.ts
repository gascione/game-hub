import useData from "./useData";

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

const useGames = () => useData<Game>("/games");
export default useGames;
