import {
  Box,
  Flex,
  HStack,
  Image,
  // Link,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import React, { Suspense, useEffect, useState } from "react";
// import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { shortenAddress } from "utils";
// import toast from "utils/toast";

// import dropWrapper from "../../assets/imgs/dropWrapper.png";
// import largeGrid from "../../assets/imgs/largegrid.png";
// import smallGrid from "../../assets/imgs/smallgrid.png";
import { largeGrid, smallGrid } from "../../constants/cdn.constants";
import axios from "axios";
import { Contracts } from "constants/networks";
import SuspenseImg from "components/SuspenseImg";
import Loader from "react-loader-spinner";
import styles from "./styles.module.scss";
import ScrollToTop from "react-scroll-to-top";
import arrowButton from "../../assets/imgs/ArrowButton.png";

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
        padding="5px"
      >
        {props.children}
      </Box>
    </Box>
  );
}

const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const Profile = () => {
  const { uid } = useParams();
  const [userNFTs, setUserNFTs] = useState([]);
  const options = [largeGrid, smallGrid];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const apiKey = process.env.REACT_APP_ALCHEMY_KEY;
  const baseURL = `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}/getNFTs`;

  useEffect(() => {
    const fetchNFTs = async () => {
      const response = await axios({
        method: "get",
        url: `${baseURL}?owner=${uid}&contractAddresses[]=${Contracts[
          isMainnet ? 1 : 4
        ].ExposureMain.toLowerCase()}`,
      });
      console.log(response);
      setUserNFTs(response.data.ownedNfts);
    };
    if (uid.length > 0) fetchNFTs();
  }, [uid, baseURL]);

  const group = getRootProps();
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
        flexDirection={"column"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
        position="relative"
      >
        <Flex
          position="relative"
          marginRight={"auto"}
          flexDirection={{ base: "column", md: "row" }}
          width={"100%"}
          paddingTop="80px"
          gridGap={{ base: "20px", md: "40px" }}
        >
          <>
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="bold"
              fontSize="30px"
              lineHeight="56px"
              marginLeft="10px"
            >
              My Profile
            </Text>
          </>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="normal"
            fontSize="16px"
            lineHeight="28px"
            color="#B5B6B7"
            alignItems={{ base: "unset", md: "center" }}
            justifyContent={{ base: "unset", md: "center" }}
            display={{ base: "none", sm: "flex" }}
          >
            {uid}
          </Text>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="normal"
            fontSize="16px"
            lineHeight="28px"
            color="#B5B6B7"
            display={{ base: "flex", sm: "none" }}
          >
            {shortenAddress(uid)}
          </Text>
        </Flex>
        <HStack
          {...group}
          right="0"
          top="15px"
          display={{ base: "none", md: "flex" }}
          flexDirection="row"
          marginLeft={"auto"}
        >
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                <Image
                  src={value}
                  filter="brightness(0) saturate(100%) invert(79%) sepia(0%) saturate(1169%) hue-rotate(47deg) brightness(93%) contrast(90%)"
                ></Image>
              </RadioCard>
            );
          })}
        </HStack>
        <div className={styles.exploreAll}>
          {userNFTs?.map((elem, index) => {
            return (
              <Flex
                minHeight={{ base: "410px", lg: "520px" }}
                width={{ base: "100%", sm: "90%", md: "calc(33.33% - 16px)" }}
                borderRadius={"2px"}
              >
                <Flex
                  width="100%"
                  position="relative"
                  paddingBottom="100%"
                  boxSizing="border-box"
                >
                  <Suspense
                    fallback={
                      <Loader
                        type="Oval"
                        color="rgb(109, 186, 252)"
                        height={32}
                      />
                    }
                  >
                    <SuspenseImg
                      src={elem.media[0].gateway}
                      // className={styles.media}
                      alt={`Photo ${index}`}
                    />
                  </Suspense>
                </Flex>
              </Flex>
            );
          })}
        </div>
      </Flex>
      <Footer />
    </div>
  );
};

export default Profile;
