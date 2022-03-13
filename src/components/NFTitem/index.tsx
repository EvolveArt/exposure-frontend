import { Flex, Image, Text } from "@chakra-ui/react";
// eslint-disable-next-line
import { Collection } from "interfaces";
import React from "react";
import { useHistory } from "react-router-dom";
import { formatName, getRandomIPFS } from "utils";
import styles from "./styles.module.scss";

const NftItem = (collection: Collection, isSoldOut: boolean) => {
  const history = useHistory();

  return (
    <Flex
      minHeight={{ base: "430px", lg: "550px" }}
      width={{ base: "100%", sm: "90%", md: "calc(33.33% - 16px)" }}
      flexDir={"column"}
      borderRadius={"2px"}
      className={styles.dropContainer}
      onClick={() => history.push(`/collection/${collection.dropId}`)}
    >
      <Flex
        width="100%"
        position="relative"
        paddingBottom="100%"
        boxSizing="border-box"
        className={styles.imageContainer}
      >
        <Image
          src={getRandomIPFS(`ipfs://${collection?.logoImageHash}`)}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundSize="contain"
          objectFit="contain"
          border="0"
          padding="8px"
        ></Image>
      </Flex>
      <Flex
        flexDirection={"column"}
        paddingLeft="8px"
        gridGap={"8px"}
        paddingBottom="8px"
      >
        <Text
          fontStyle="normal"
          fontWeight="600"
          fontSize="20px"
          lineHeight="35px"
          paddingTop="19px"
        >
          {collection.collectionName}
        </Text>
        <Text fontWeight="normal" fontSize="14px" lineHeight="28px">
          By {collection.artists && formatName(collection.artists[0])}
        </Text>
        <Text fontSize="12px" lineHeight="18px">
          <span style={{ fontWeight: "bold" }}>{collection.totalSupply} </span>
          photos
        </Text>
      </Flex>
      {isSoldOut && (
        <Flex
          width={"100%"}
          height="32px"
          backgroundColor={"#000"}
          textAlign="center"
          fontWeight="700"
          fontSize="16px"
          lineHeight="20px"
          color={"#fff"}
          justifyContent="center"
          alignItems={"center"}
          marginTop="auto"
        >
          Sold Out
        </Flex>
      )}
    </Flex>
  );
};
export default NftItem;
