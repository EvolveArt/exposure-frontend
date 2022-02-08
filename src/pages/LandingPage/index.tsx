import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import agenda from "../../assets/imgs/agenda.png";
import available from "../../assets/imgs/available.png";
import ether from "../../assets/imgs/ether.png";
import mintType from "../../assets/imgs/mintType.png";

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
    <Flex
      width={"80%"}
      height={"90vh"}
      flexDirection={"row"}
      paddingTop={"85px"}
      margin="auto"
      gridGap={"24px"}
    >
      <Flex
        width={"calc(50% - 12px)"}
        height="100%"
        justifyContent="end"
        alignItems="center"
        style={{
          borderImage: "url('/images/line.png') 30",
        }}
      >
        <Image src={arrival.image}></Image>
      </Flex>
      <Flex
        flexDirection={"column"}
        width={"calc(50% - 12px)"}
        height="100%"
        justifyContent="center"
      >
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
          fontSize="16px"
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
            <span style={{ fontWeight: "800" }}>{arrival.releaseDate}</span> at{" "}
            <span style={{ fontWeight: "800" }}>{arrival.releaseHour} GMT</span>
          </Text>
        </Flex>
        <Flex border={"1px solid #000"} width="fit-content">
          <Button
            fontSize={"sm"}
            fontWeight={600}
            fontFamily={"Inter"}
            color={"white"}
            bg={"#000"}
            borderRadius="0px"
            width={"550px"}
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
  );
};

const LandingPage = () => {
  return (
    <div>
      <Header />
      {arrivalPage(arrival)}
    </div>
  );
};

export default LandingPage;
