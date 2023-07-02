import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  //xa importar los games, definimos que games es un Array de Game (definidos en la interface)
  //despues lo cambiamos a data pero es lo mismo
  const [data, setData] = useState<T[]>([]);
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
      // como es generico lo tenemos que escribir <FetchResponse<T>> aunque quede raro
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
