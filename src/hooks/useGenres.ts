import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Game } from "./useGames";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}
const useGenres = () => {
  //xa importar los games, definimos que games es un Array de Game (definidos en la interface)
  const [genres, setGenres] = useState<Genre[]>([]);
  //xa los error messages
  const [error, setError] = useState([]);
  //gestionar cuando se cargan/Load las tarjetas
  const [isLoading, setLoading] = useState(false);

  //xa mandar los requests
  useEffect(() => {
    const controller = new AbortController();

    //antes de llamar a la API, todo se esta cargando
    setLoading(true);
    //con el <FetchGenreResponse> sabemos que la response
    //se organiza como la definimos anteriormente
    apiClient
      .get<FetchGenreResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
