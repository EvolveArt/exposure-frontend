import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./styles.module.scss";

const NftItem = (drops: {
  image: string;
  title: string;
  author: string;
  number: string;
}) => {
  return (
    <Flex
      minHeight={{ base: "410px", lg: "520px" }}
      width={{ base: "100%", sm: "90%", md: "calc(33.33% - 16px)" }}
      flexDir={"column"}
      borderRadius={"2px"}
      className={styles.dropContainer}
    >
      <Flex
        width="100%"
        position="relative"
        paddingBottom="100%"
        boxSizing="border-box"
        className={styles.imageContainer}
      >
        <Image
          src={drops.image}
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
          {drops.title}
        </Text>
        <Text fontWeight="normal" fontSize="14px" lineHeight="28px">
          By {drops.author}
        </Text>
        <Text fontSize="12px" lineHeight="18px">
          <span style={{ fontWeight: "bold" }}>{drops.number} </span>photos
        </Text>
      </Flex>
    </Flex>
  );
};
export default NftItem;
