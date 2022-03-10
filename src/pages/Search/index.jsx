import React, { useState } from "react";
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
import borderbl from "../../assets/imgs/borderbl.png";
import borderbr from "../../assets/imgs/borderbr.png";
import borderml from "../../assets/imgs/borderml.png";
import bordermr from "../../assets/imgs/bordermr.png";
import bordertl from "../../assets/imgs/bordertl.png";
import bordertr from "../../assets/imgs/bordertr.png";

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
        }}
        padding="5px 34px"
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
  const options = ["Artists", "Collection"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

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
        <HStack
          {...group}
          right="0"
          top="15px"
          display={{ base: "none", md: "flex" }}
          flexDirection="row"
          marginTop={"50px"}
          border="2px solid #000"
          width={"fit-content"}
          padding="9px 0px"
        >
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <>
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
                <Box
                  width={"0px"}
                  border="1px solid #EAEAEA"
                  height={"30px"}
                  transform="translateX(2px)"
                  zIndex={"-1"}
                />
              </>
            );
          })}
        </HStack>
      </Flex>
      <Footer />
    </div>
  );
};
export default Search;
