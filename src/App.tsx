import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        // xa pantalla pequeña definimos el layout
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, //devices con mas de 1024px
      }}
    >
      <GridItem area={"nav"} bg="coral">
        Nav
      </GridItem>
      {/* show nos permite definir que elementos queremos que se muestren y cuales no  */}
      <Show above="lg">
        <GridItem area={"aside"} bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"} bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
