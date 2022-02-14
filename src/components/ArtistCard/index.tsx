import { Flex, Image, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React from "react";

const ArtistCard = (artists: {
  image: string;
  name: string;
  number: string;
}) => {
  return (
    <Flex
      flexDirection={"column"}
      paddingRight="12px"
      paddingLeft={"12px"}
      className={styles.artistComponent}
    >
      <Image src={artists.image}></Image>
      <Text fontWeight="600" fontSize="20px" lineHeight="35px">
        {artists.name}
      </Text>
      <Text fontSize="12px" lineHeight="18px">
        <span style={{ fontWeight: "bold" }}>{artists.number}</span> Collections
      </Text>
    </Flex>
  );
};
export default ArtistCard;
