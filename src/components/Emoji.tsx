import { Image, ImageProps } from "@chakra-ui/react";
import cool from "../assets/cool.png";
import meh from "../assets/meh.png";
import exceptional from "../assets/exceptional.png";

interface Props {
  rating: number;
}
const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: cool, alt: "recommended", boxSize: "25px" },
    5: { src: exceptional, alt: "exceptional", boxSize: "25px" },
  };

  return <Image {...emojiMap[rating]} marginTop={1} />;
};

export default Emoji;
