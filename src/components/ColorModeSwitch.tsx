import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  // toggleColorMode = funcion
  // colorMode = property que contiene el color mode actual
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text>{colorMode} Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
