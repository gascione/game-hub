import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient, { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";

const apiClient = new APIClient<Game>("/games");

//definimos la interface de c/Game
export interface Game {
  id: number;
  name: string;
  background_image: string;
  //array of objects where each object has a platform property of type Platform
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

interface PostQuery {
  pageSize: number;
}

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    //xa chequear que pagina debemos monstrar de info
    getNextPageParam: (lastPage, allPages) => {
      //allpages tiene la data de todas las paginas
      //en esta funcion te devuelve la pagina siguiente, es decir si estas en la 1, te devuelve la 2
      //si estamos en la pagina 1, entonces allPages es un array de 1 solo elemento
      //con JSON placeholder, si busca una pagina que no existe xq ya no hay mas info, entonces te vuelve un empty array
      //entonces en algun momento lastPage va a ser un empty array por lo tanto usamos la siguiente expresion
      //en un caso normal, la api te devuelve la cantidad total de info y asi calculas el numero de paginas y no hacemos esto
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000, //24hrs
  });

export default useGames;
