import React, { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./styles.module.scss";

import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import borderbl from "../../assets/imgs/borderbl.png";
import borderbr from "../../assets/imgs/borderbr.png";
import borderml from "../../assets/imgs/borderml.png";
import bordermr from "../../assets/imgs/bordermr.png";
import bordertl from "../../assets/imgs/bordertl.png";
import bordertr from "../../assets/imgs/bordertr.png";

const Search = () => {
  const [collection, setCollection] = useState("");

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
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"114px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          opacity="0.1"
          width={"27px"}
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
          opacity="0.1"
          width={"27px"}
          position="absolute"
          transform={"rotate(180deg)"}
          bottom={"-6px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
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
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="600"
          fontSize="16px"
          lineHeight="28px"
          paddingBottom="50px"
          letterSpacing={"1px"}
        >
          Search for your favorite artists and collections
        </Text>
        <Flex position={"relative"} width="100%" padding="30px">
          <Image src={bordertl} position="absolute" top={"0"} left="0" />
          <Image src={borderbl} position="absolute" bottom={"0"} left="0" />
          <Image src={bordertr} position="absolute" top={"0"} right="0" />
          <Image src={borderbr} position="absolute" bottom={"0"} right="0" />
          <Image src={borderml} position="absolute" bottom={"45%"} left="0" />
          <Image src={bordermr} position="absolute" bottom={"45%"} right="0" />
          <input
            className={styles.input}
            maxLength={40}
            placeholder="Search"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            // onBlur={validateName}
          />
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};
export default Search;
