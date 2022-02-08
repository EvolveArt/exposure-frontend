import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import agenda from "../../assets/imgs/agenda.png";
import available from "../../assets/imgs/available.png";
import ether from "../../assets/imgs/ether.png";
import mintType from "../../assets/imgs/mintType.png";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import arrow from "../../assets/imgs/arrow.png";
import arrowContainer from "../../assets/imgs/arrowContainer.png";

const arrival = {
  title: "Touching Strangers",
  image: "/images/strangers.png",
  author: "Richard Renaldi",
  mintType: "Random mint",
  mintPrice: "0.9",
  mintAvailable: "75",
  releaseDate: "18/02/2022",
  releaseHour: "16:00",
};

const arrivalPage = (arrival: {
  title: string;
  image: string;
  author: string;
  mintType: string;
  mintPrice: string;
  mintAvailable: string;
  releaseDate: string;
  releaseHour: string;
}) => {
  return (
    <>
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"80vh"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems={"center"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
      >
        <Flex
          width={{
            base: "100%",
            md: "calc(60% - 12px)",
            lg: "calc(50% - 12px)",
          }}
          height={{ base: "fit-content", md: "80vh" }}
          paddingTop={{ base: "50px", md: "unset" }}
          paddingBottom={{ base: "50px", md: "unset" }}
          justifyContent={{ base: "center", md: "end" }}
          alignItems="center"
          position="relative"
        >
          <Image src={arrival.image}></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"0"}
            left="0"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"0"}
            right={{ base: "0", md: "-35px" }}
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            right="0"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={ticon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"14px"}
            right="50%"
            left="50%"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            left="0"
          ></Image>
        </Flex>
        <Flex
          flexDirection={"column"}
          width={{
            base: "100%",
            md: "calc(40% - 12px)",
            lg: "calc(50% - 12px)",
          }}
          height={{ base: "fit-content", md: "80vh" }}
          justifyContent="center"
          position="relative"
          paddingBottom={{ base: "50px", md: "unset" }}
        >
          <Image
            display={{ base: "none", md: "unset" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"0"}
            right="0px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            left="0px"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            right="0px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={ticon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            transform={"rotate(180deg)"}
            bottom={"14px"}
            right="50%"
            left="50%"
          ></Image>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="800"
            fontSize="40px"
            lineHeight="53px"
            paddingBottom={"8px"}
          >
            {arrival.title}
          </Text>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={"16px"}
            lineHeight="28px"
            paddingBottom={"58px"}
          >
            By {arrival.author}
          </Text>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={mintType} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"17px"}
            >
              {arrival.mintType}
            </Text>
          </Flex>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={ether} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"17px"}
            >
              Mint price -{" "}
              <span style={{ fontWeight: "800" }}>{arrival.mintPrice} ETH</span>
            </Text>
          </Flex>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={available} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"17px"}
            >
              Mint available -{" "}
              <span style={{ fontWeight: "800" }}>
                0 / {arrival.mintAvailable}
              </span>
            </Text>
          </Flex>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={agenda} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"35px"}
            >
              Release date -{" "}
              <span style={{ fontWeight: "800" }}>{arrival.releaseDate}</span>{" "}
              at{" "}
              <span style={{ fontWeight: "800" }}>
                {arrival.releaseHour} GMT
              </span>
            </Text>
          </Flex>
          <Flex border={"1px solid #000"} width="100%">
            <Button
              fontSize={"sm"}
              fontWeight={600}
              fontFamily={"Inter"}
              color={"white"}
              bg={"#000"}
              borderRadius="0px"
              width={"100%"}
              height={"64px"}
              style={{ marginInlineStart: "unset" }}
              _hover={{
                transform: "translate3d(4px,4px,0px)",
              }}
            >
              Connect Wallet
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems="center"
        transform={"translateY(-50px)"}
        position="relative"
      >
        <Image
          src={arrowContainer}
          position="absolute"
          display={{ base: "none", md: "unset" }}
        />
        <Image src={arrow} display={{ base: "none", md: "unset" }} />
      </Flex>
    </>
  );
};

const LandingPage = () => {
  return (
    <div>
      <Header />
      {arrivalPage(arrival)}
      <Box position={"relative"} paddingBottom="56px">
        <Flex
          width={{ base: "90%", lg: "80%" }}
          height="fit-content"
          flexDirection="column"
          margin="auto"
          gridGap={"8px"}
          zIndex="1"
          borderLeft="1px solid #aaa"
          paddingLeft={"16px"}
        >
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="30px"
            lineHeight="56px"
          >
            About Curated Drop
          </Text>
          <Text textAlign={"justify"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et tellus
            id mauris in. Adipiscing enim, augue sapien mattis vestibulum.
            Fermentum sapien viverra fusce vitae, quam a. Turpis phasellus duis
            justo, sodales. Massa gravida non eget id diam. Porttitor hac diam
            nibh diam in fringilla. Rutrum consequat vitae sapien et est. Sit.
          </Text>
        </Flex>
      </Box>
    </div>
  );
};

export default LandingPage;
