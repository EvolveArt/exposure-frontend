import { Flex, Image, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React from "react";
import { formatName, getRandomIPFS } from "utils";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { Artist } from "interfaces";

const ArtistCard = (artist: Artist) => {
  return (
    <>
      <Link to={`/artist/${artist.address}`}>
        <Flex
          flexDirection={"column"}
          paddingRight="12px"
          paddingLeft={"12px"}
          className={styles.artistComponent}
        >
          <Image
            src={getRandomIPFS(`ipfs://${artist.imageHash}`)}
            width={"262px"}
            height={"262px"}
            maxWidth={"unset"}
            filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.15))"
          ></Image>
          <Text fontWeight="600" fontSize="20px" lineHeight="35px">
            {formatName(artist)}
          </Text>
          <Text fontSize="12px" lineHeight="18px">
            <span style={{ fontWeight: "bold" }}>{0}</span> Collections
          </Text>
        </Flex>
      </Link>
    </>
  );
};
export default ArtistCard;
