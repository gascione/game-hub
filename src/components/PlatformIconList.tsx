import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { Platform } from "../hooks/useGames";
import { IconType } from "react-icons";

interface Props {
  platforms: Platform[];
}
const PlatformIconList = ({ platforms }: Props) => {
  //mapeamos cada icono con el nombre, xa que no nos de error tenemos que poner que es un objeto que va a tener any number of string keys (string signature)
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    android: FaAndroid,
    linux: FaLinux,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };
  return (
    // ahi escribimos {1} que corresponde a 1 medida base definida por chakra, si queremos un valor preciso ponemos {'10px'}
    <HStack marginY={1}>
      {/* destructuramos platform asi no tenemos que escribir platform.platform */}
      {platforms.map((platform) => (
        // xa renderizar los iconos de manera dinamica, usamos el slug porque siempre es igual y esta en minuscula
        <Icon
          key={platform.id}
          as={iconMap[platform.slug]}
          color="gray.500"
        ></Icon>
      ))}
    </HStack>
  );
};

export default PlatformIconList;
