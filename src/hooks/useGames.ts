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
  metacritic: number;
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
  //gestionar cuando se cargan/Load las tarjetas
  const [isLoading, setLoading] = useState(false);

  //xa mandar los requests
  useEffect(() => {
    const controller = new AbortController();

    //antes de llamar a la API, todo se esta cargando
    setLoading(true);
    //con el <FetchGamesResponse> sabemos que la response
    //se organiza como la definimos anteriormente
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
