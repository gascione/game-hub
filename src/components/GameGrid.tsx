import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

//definimos la interface de c/Game
interface Game {
  id: number;
  name: string;
}

//definimos el interface de cmo vamos a recibir la response
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  //xa importar los games, definimos que games es un Array de Game (definidos en la interface)
  const [games, setGames] = useState<Game[]>([]);
  //xa los error messages
  const [error, setError] = useState([]);
  //xa mandar los requests
  useEffect(() => {
    //con el <FetchGamesResponse> sabemos que la response
    //se organiza como la definimos anteriormente
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  });

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
