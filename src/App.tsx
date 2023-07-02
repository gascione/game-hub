import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import { Genre } from "./hooks/useGenres";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  return (
    <Grid
      templateAreas={{
        // xa pantalla pequeña definimos el layout
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, //devices con mas de 1024px
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      {/* show nos permite definir que elementos queremos que se muestren y cuales no  */}
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          {/* de esta manera agarramos el genre que fue seleccionado en el component (es decir anteriormente) y se lo pasamos al useState para que despues lo pueda usar el component GameGrid */}
          <GenreList
            selectedGenre={selectedGenre}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
