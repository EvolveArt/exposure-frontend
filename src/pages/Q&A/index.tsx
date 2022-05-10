import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import styles from "./styles.module.scss";
import dropWrapper from "../../assets/imgs/dropWrapper.png";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";

const Faq = [
  // {
  //   title: "What is Rhapsody ?",
  //   desc:
  //     "Rhapsody is a web3 platform curating the best photographic series from the world’s most renowned artists. Our platform is dedicated to photography as an art and a science.",
  // },
  // {
  //   title: "What are curated drops ? How do they work ?",
  //   desc:
  //     "Rhapsody’s curated drops are theme based and occur every month with 3 to 5 different collections/series from various photographers. They each have their own narrative and style but, together, they tell a broader story. Our model is based on random mints in which, after the purchase, the collector receives a random photograph from the chosen collection/series.",
  // },
  // {
  //   title: "How does curation work ?",
  //   desc:
  //     "Our curation team selects a series of photographic works based on Rhapsody’s future thematics as well as the outstanding quality of the photographer’s work and vision. What we don’t base our selection on : Follower count, Name and Relationships",
  // },
  // {
  //   title: "Can I submit my work to Rhapsody ?",
  //   desc:
  //     "If you would like to apply to do a curated drop, please send your application (images + explanation of your project) to curation@exposure.art. We do not guarantee a quick reply as we receive several requests per day and our team is still small. Please forgive the delay ;)",
  // },
  // {
  //   title:
  //     "When I buy an NFT on Rhapsody, do I own the copyright of the work ?",
  //   desc:
  //     "Purchasing an NFT from Rhapsody or on the secondary market gives you the right to print the image for your own personal use (ie. Framing and displaying in your home…). You do not have the following rights regarding NFTs purchased on Rhapsody : Commercial usage and Intellectual property",
  // },
  // {
  //   title: "Where can I meet my fellow collectors ?",
  //   desc:
  //     "We’ve created a Discord server where collectors can chat with each other.",
  // },
  // {
  //   title: "How do I mint ?",
  //   desc:
  //     "You can mint by connecting your wallet to our website and clicking the “mint” button for your chosen series.",
  // },
  // {
  //   title: "What are the environmental effects of blockchain technology ?",
  //   desc:
  //     "Blockchains make a platform like Rhapsody possible, but they do have a power-hungry dark side. Rhapsody tries to contribute as much as possible to environmental initiatives to offset its carbon footprint. Today, for every NFT bought on our platform, 10 trees are planted. While this might not be enough just yet, we pledge to only ever increase our commitments to the environment. Important note: Ethereum is moving away from Proof-of-Work (PoW) and toward Proof-of-Stake (PoS). When this change happens, it will reduce Ethereum’s energy consumption by 99,95%. That said, Rhapsody’s commitment will not end there and we will continue to support environment-friendly initiatives.",
  // },
  // {
  //   title: "How can I view and/or resell the NFT I bought ?",
  //   desc:
  //     "Your NFT is viewable on OpenSea right after your purchase. It might take a few minutes for the image to appear.",
  // },
  // {
  //   title: "Does Rhapsody have a token ?",
  //   desc: "No token.",
  // },
  // {
  //   title: "What are some best practices for security ?",
  //   desc:
  //     "We urge our customers to purchase a hardware wallet (ie. Ledger) to secure their crypto-assets (crypto-currencies and NFTs). Buy directly from their secure website at https://www.ledger.com/.",
  // },
  // {
  //   title: "Who do I contact if I have technical difficulties ?",
  //   desc:
  //     "We have created an IT channel in our Discord where you can ask questions relating to any technical difficulties you may have encountered.",
  // },
  {
    title: "What is Rhapsody Curated ?",
    desc: "Rhapsody Curated is an international high curation NFT platform 100% dedicated to photography. It has the ambition of being the photographer’s guide towards the metaverse while perpetuating the deep-rooted French photographic tradition. Starting in April, a first inaugural season of three series will be launched, highlighting four photographers on the theme of being Human.",
  },
  {
    title: "What are curated drops ? How do they work ?",
    desc: "Each month, Exposure builds a season of 3 to 5 photographic projects selected according to a specific theme, as for an exhibition. The projects are composed of at least 30 photographs available in the form of unique 1/1 NFTs.\n" +
        "To highlight the photographer's story and writing, we use a random drop system based on the model developed by ArtBlocks. This “drop” system, well known to NFT enthusiasts, consists in offering the collector the opportunity of acquiring a photograph from the series at random. Thus, at the time of purchase, the collector does not know the exact work he is acquiring, but what he captures is his unique piece of the story told by the photographer.\n",
  },
  {
    title: "How does curation work ?",
    desc: "At Rhapsody Curated, an in-house curation team selects photographic works based on the thematics of our future seasons as well as the outstanding quality of the photographer’s work and vision.",
  },
  {
    title: "When I buy an NFT on Rhapsody Curated, do I own the copyright of the work ?",
    desc: "Purchasing an NFT from Rhapsody Curated or on the secondary market doesn’t automatically give you the right to use the image as you please. Have a look at your token’s metadata to see which license the photographer chose for your specific NFT.",
  },
  {
    title: "Where can I meet my fellow collectors ?",
    desc: "We’ve created the Rhapsody Curated Discord server where collectors and artists can chat with each other and show off their collected photographs.",
  },
  {
    title: "How do I buy a photograph on Rhapsody Curated ?",
    desc: "To purchase a photograph on the Rhapsody Curated platform, you need to connect a wallet holding the right amount of ether (ETH) and click on the “mint” button for the chosen series.",
  },
  {
    title: "What are the environmental effects of blockchain technology ?",
    desc: "Rhapsody Curated uses the blockchain Ethereum, which is moving away from the power-hungry Proof-of-Work and toward a more environmentally friendly Proof-of-Stake. When this change happens, in a few months, it will reduce Ethereum’s energy consumption by 99,95%.",
  },
  {
    title: "How can I view and/or resell the NFT I bought ?",
    desc: "Your NFT is viewable on marketplaces such as LooksRare, OpenSea or Rarible right after your purchase. It might take a few minutes for the image to appear.",
  },
  {
    title: "Does Rhapsody Curated have a token ?",
    desc: "No token.",
  },
  {
    title: "What are some best practices for security ?",
    desc: "We urge our collectors to purchase a hardware wallet (ie. Ledger) to secure their crypto-assets (crypto-currencies and NFTs).",
  },
  {
    title: "Who do I contact if I have technical difficulties ?",
    desc: "We have created an IT channel in our Discord where you can ask questions relating to any technical difficulties you may have encountered. You can also reach out to us through Twitter.",
  },

];

const QA = () => {
  return (
    <>
      <Header />
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"80vh"}
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
          left="-7px"
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          right={{ base: "-7px", md: "-7px" }}
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          right="-7px"
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
          left="-7px"
        ></Image>
        <Flex
          position="relative"
          marginRight={"auto"}
          width={{ base: "88vw", lg: "80vw" }}
          marginTop={"100px"}
        >
          <Image
            src={dropWrapper}
            position="absolute"
            transform="translate3d(-2px,3px,0px)"
            zIndex={"-1"}
            height="55px"
            width={"180px"}
          />
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="27px"
            lineHeight="56px"
            marginLeft="10px"
          >
            Help Center
          </Text>
        </Flex>
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="bold"
          // textAlign="center"
          // fontSize="27px"
          // lineHeight="56px"
          marginLeft="10px"
      >
        Here, you’ll find answers to the questions we get all the time. If yours is not answered here, don’t hesitate to get in touch via our Twitter (@rhapsodycurated).
      </Text>
        <Accordion allowToggle marginTop={"30px"}>
          {Faq.map((faq) => (
            <AccordionItem borderTopWidth={"0px"} borderBottomWidth="1px">
              <h2>
                <AccordionButton _focus={{ outline: "none !important" }}>
                  <Box
                    flex="1"
                    textAlign="left"
                    paddingY={"5px"}
                    className={styles.accordionTitle}
                  >
                    {faq.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{faq.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
      <Footer />
    </>
  );
};
export default QA;
