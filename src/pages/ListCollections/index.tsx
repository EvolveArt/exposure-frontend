import { Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import styles from "./styles.module.scss";
import arrowButton from "../../assets/imgs/ArrowButton.png";

const ListCollections = () => {
  return (
    <div>
      <Header />
      <ScrollToTop
        smooth
        color="#000"
        component={<Image src={arrowButton} />}
        style={{ background: "unset" }}
      />
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"80vh"}
        flexDirection="column"
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
        position="relative"
      >
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="bold"
          fontSize={{ base: "25px", md: "30px" }}
          lineHeight={{ base: "20px", sm: "56px" }}
          paddingTop="30px"
        >
          Gestion des collections
        </Text>
        <Flex>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              maxLength={40}
              placeholder="Nom de la collection"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              // onBlur={validateName}
            />
          </div>
          <Link marginLeft="auto" href="/addcollection">
            <Button
              fontSize={"sm"}
              fontWeight={600}
              fontFamily={"Inter"}
              color={"white"}
              bg={"#000"}
              borderRadius="0px"
              width={{ base: "100px", sm: "150px", md: "200px" }}
              height={"46px"}
              _hover={{
                opacity: "0.6",
              }}
            >
              Add Collection
            </Button>
          </Link>
        </Flex>
        <Flex flexWrap={"wrap"} width="100%" gridGap={"24px"}></Flex>
      </Flex>
      <Footer />
    </div>
  );
};
export default ListCollections;
