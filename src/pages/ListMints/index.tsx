import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import arrowButton from "../../assets/imgs/ArrowButton.png";
import ScrollToTop from "react-scroll-to-top";

const ListMints = () => {
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
          Suivi des mints
        </Text>
        <Flex>
          <Button
            marginLeft={"auto"}
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
            Exporter
          </Button>
        </Flex>
        <div className={styles.mints}>
          <div className={cx(styles.history, styles.heading)}>
            <div className={styles.prix}>Prix</div>
            <div className={styles.artist}>Artiste</div>
            <div className={styles.collection}>Collection</div>
            <div className={styles.wallet}>Wallet Adress</div>
            <div className={styles.email}>Email</div>
          </div>
        </div>
      </Flex>
      <Footer />
    </div>
  );
};
export default ListMints;
