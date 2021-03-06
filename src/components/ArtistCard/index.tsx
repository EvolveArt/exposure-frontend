import { Flex, Image, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React from "react";
import { formatName } from "utils";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { Artist } from "interfaces";
// import arr from "../../assets/imgs/arrowContainer.png";
import { arr, getCDNLink } from "../../constants/cdn.constants";

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
            // src={getRandomIPFS(`ipfs://${artist.imageHash}`)}
            src={getCDNLink(artist.imageHash)}
            fallbackSrc={arr}
            width={"242px"}
            height={"242px"}
            maxWidth={"unset"}
            filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.15))"
          ></Image>
          <Flex height={"40px"} overflow="hidden" width={"100%"}>
            <Text fontWeight="600" fontSize="20px" lineHeight="35px">
              {formatName(artist)}
            </Text>
          </Flex>
          <Text fontSize="12px" lineHeight="18px">
            <span style={{ fontWeight: "bold" }}>{artist?.nbCollections}</span>{" "}
            Collections
          </Text>
        </Flex>
      </Link>
    </>
  );
};
export default ArtistCard;
