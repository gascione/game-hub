import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

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
}

//definimos el interface de cmo vamos a recibir la response
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  //xa importar los games, definimos que games es un Array de Game (definidos en la interface)
  const [games, setGames] = useState<Game[]>([]);
  //xa los error messages
  const [error, setError] = useState([]);

  //xa mandar los requests
  useEffect(() => {
    const controller = new AbortController();

    //con el <FetchGamesResponse> sabemos que la response
    //se organiza como la definimos anteriormente
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
