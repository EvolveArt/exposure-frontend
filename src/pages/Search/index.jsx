import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./styles.module.scss";

import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import NftItem from "components/NFTitem";
import { useApi } from "api";
import ArtistCard from "components/ArtistCard";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        _checked={{
          filter: "brightness(0) saturate(100%)",
          textDecoration: "underline",
        }}
        paddingRight="30px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="600"
        fontSize="16px"
        lineHeight="28px"
        letterSpacing="1px"
        color="#B5B6B7"
        className={styles.switch}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const Search = () => {
  const [collection, setCollection] = useState("");
  const [searching, setSearching] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState("Collection");
  const options = ["Artists", "Collection"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Collection",
    onChange: (nextValue) => setSelected(nextValue),
  });

  const group = getRootProps();

  const { searchCollections, searchArtists } = useApi();

  useEffect(() => {
    const updateCollections = async () => {
      setSearching(true);
      const _collections =
        selected === "Collection"
          ? await searchCollections(collection)
          : await searchArtists(collection);
      setCollections(_collections.data);
      setSearching(false);
    };

    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  return (
    <div>
      <Header />
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"calc(100vh - 80px)"}
        flexDirection={"column"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
        position="relative"
      >
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"107px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          transform={"rotate(180deg)"}
          bottom={"-14px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
        ></Image>
        <Flex
          position="relative"
          marginRight={"auto"}
          width={{ base: "88vw", lg: "80vw" }}
          marginLeft="auto"
          marginTop={"100px"}
        >
          <Image
            src={artistWrapper}
            position="absolute"
            transform="translate3d(-2px,3px,0px)"
            zIndex={"-1"}
            height="50px"
          />
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="30px"
            lineHeight="56px"
            marginLeft="10px"
          >
            Search
          </Text>
        </Flex>
        <HStack
          {...group}
          right="0"
          top="15px"
          display={{ base: "none", md: "flex" }}
          flexDirection="row"
          width={"fit-content"}
          padding="9px 0px"
          marginTop={"40px"}
        >
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <>
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
                <Box width={"0px"} height={"30px"} zIndex={"-1"} />
              </>
            );
          })}
        </HStack>
        <Flex position={"relative"} width="100%" paddingBottom={"40px"}>
          <input
            className={styles.input}
            maxLength={40}
            placeholder="Search"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            // onBlur={validateName}
          />
        </Flex>
        {searching ? (
          <div className={styles.stage}>
            <div className={styles.dotTyping}></div>
          </div>
        ) : (
          <div className={styles.exploreAll}>
            {collections.map((collection) => {
              return selected === "Collection"
                ? NftItem(collection)
                : ArtistCard(collection);
            })}
          </div>
        )}
      </Flex>

      <Footer />
    </div>
  );
};
export default Search;
