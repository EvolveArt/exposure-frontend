import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import styles from "./styles.module.scss";
// import Select from "react-dropdown-select";
import ether from "../../assets/imgs/ether.png";
import ScrollToTop from "react-scroll-to-top";
import arrowButton from "../../assets/imgs/ArrowButton.png";

const Dashboard = () => {
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
        >
          Dashboard
        </Text>
        <Flex>
          <div className={styles.inputWrapper}>
            {/* <Select
              //   options={artists}
              // disabled={isMinting}
              //   values={selected}
              //   onChange={([col]) => {
              //     setSelected([col]);
              //     // setNft(col.erc721Address);
              //     // setType(col.type);
              //   }}
              className={styles.input}
              placeholder="Choose Artist"
              itemRenderer={({ item, methods }) => (
                <div
                  key={item._id}
                  className={styles.collectionInput}
                  onClick={() => {
                    methods.clearAll();
                    methods.addItem(item);
                  }}
                >
                  <img
                    src={`https://cloudflare-ipfs.com/ipfs/${item.imageHash}`}
                    alt="artist-img"
                    className={styles.collectionLogo}
                  />
                  <div className={styles.collectionName}>
                    {item.firstname + " " + item.lastname}
                  </div>
                </div>
              )}
              contentRenderer={({ props: { values } }) =>
                values?.length > 0 ? (
                  <div className={styles.collection}>
                    <img
                      src={`https://cloudflare-ipfs.com/ipfs/${values[0].imageHash}`}
                      className={styles.collectionLogo}
                      alt="artist-img"
                    />
                    <div className={styles.collectionName}>
                      {values[0].firstname + " " + values[0].lastname}
                    </div>
                  </div>
                ) : (
                  <div className={styles.collection} />
                )
              }
            /> */}
          </div>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            fontFamily={"Inter"}
            color={"white"}
            bg={"#000"}
            borderRadius="0px"
            width={"200px"}
            height={"46px"}
            _hover={{
              opacity: "0.6",
            }}
          >
            Export
          </Button>
        </Flex>
        <Flex
          width={"100%"}
          flexDirection={{ base: "column", md: "row" }}
          gridGap={"24px"}
        >
          <Flex
            flexDirection={"column"}
            width={{ base: "100%", md: "calc(50% - 12px)" }}
            gridGap={"24px"}
          >
            <Flex
              border={"1px solid #000"}
              width="100%"
              padding="20px"
              gridGap={{ base: "40px", sm: "24px" }}
              height={{ base: "unset", sm: "150px" }}
              justifyContent={"center"}
              alignItems="center"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                flexDirection="column"
                justifyContent={{ base: "center", md: "unset" }}
                alignItems={{ base: "center", md: "unset" }}
              >
                <Flex gridGap={"10px"}>
                  <Image
                    src={ether}
                    width={{ base: "30px", md: "40px" }}
                    height={{ base: "30px", md: "40px" }}
                    marginTop="auto"
                    marginBottom="auto"
                  />
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="bold"
                    fontSize={{ base: "25px", md: "30px" }}
                    lineHeight={{ base: "20px", sm: "56px" }}
                  >
                    23
                  </Text>
                </Flex>
                <Text>October Income</Text>
              </Flex>
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                flexDirection="column"
                justifyContent={{ base: "center", md: "unset" }}
                alignItems={{ base: "center", md: "unset" }}
              >
                <Flex gridGap={"10px"}>
                  <Image
                    src={ether}
                    width={{ base: "30px", md: "40px" }}
                    height={{ base: "30px", md: "40px" }}
                    marginTop="auto"
                    marginBottom="auto"
                  />
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="bold"
                    fontSize={{ base: "25px", md: "30px" }}
                    lineHeight={{ base: "20px", sm: "56px" }}
                  >
                    105
                  </Text>
                </Flex>
                <Text>Total Income</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              width={"100%"}
              gridGap={"24px"}
              height={{ base: "unset", md: "150px" }}
              justifyContent={"center"}
              alignItems="center"
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>Number of mints</Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23
                </Text>
              </Flex>
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>Average mint per user</Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            width={{ base: "100%", md: "calc(50% - 12px)" }}
            gridGap={"24px"}
          >
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              width={"100%"}
              gridGap={"24px"}
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23
                </Text>
                <Text>Total users</Text>
              </Flex>
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23
                </Text>
                <Text>New buyers</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              width={"100%"}
              gridGap={"24px"}
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>Number of mints this month</Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23
                </Text>
              </Flex>
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>Gaz fees spent</Text>
                <Flex gridGap={"10px"}>
                  <Image
                    src={ether}
                    width={{ base: "30px", md: "40px" }}
                    height={{ base: "30px", md: "40px" }}
                    marginTop="auto"
                    marginBottom="auto"
                  />
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="bold"
                    fontSize={{ base: "25px", md: "30px" }}
                    lineHeight={{ base: "20px", sm: "56px" }}
                  >
                    23
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          width={"100%"}
          flexDirection={{ base: "column", md: "row" }}
          gridGap={"24px"}
        >
          <Flex
            flexDirection={"column"}
            width={{ base: "100%", md: "calc(50% - 12px)" }}
            gridGap={"24px"}
          >
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              width={"100%"}
              gridGap={"24px"}
              height={{ base: "unset", sm: "150px" }}
              justifyContent={"center"}
              alignItems="center"
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>CA Initial art</Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23 eth
                </Text>
              </Flex>
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>CA Photographes</Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  23 eth
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              width={"100%"}
              gridGap={"24px"}
              height={{ base: "unset", sm: "150px" }}
              justifyContent={"center"}
              alignItems="center"
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>Number of artists</Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "25px", md: "30px" }}
                  lineHeight={{ base: "20px", sm: "56px" }}
                >
                  120
                </Text>
              </Flex>
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>CA moyen par artiste</Text>
                <Flex gridGap="10px">
                  <Image
                    width={{ base: "30px", md: "40px" }}
                    height={{ base: "30px", md: "40px" }}
                    marginTop="auto"
                    marginBottom="auto"
                    src={ether}
                  />
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="bold"
                    fontSize={{ base: "25px", md: "30px" }}
                    lineHeight={{ base: "20px", sm: "56px" }}
                  >
                    23
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            width={{ base: "100%", md: "calc(50% - 12px)" }}
            gridGap={"24px"}
          >
            <Flex
              flexDirection="row"
              width={"100%"}
              gridGap={"24px"}
              height="150px"
              justifyContent={"center"}
              alignItems="center"
              display={{ base: "none", md: "unset" }}
            ></Flex>
            <Flex
              flexDirection="row"
              width={"100%"}
              gridGap={"24px"}
              height="150px"
            >
              <Flex
                width={{ base: "100%", sm: "calc(50% - 12px)" }}
                border={"1px solid #000"}
                padding="20px"
                gridGap={"10px"}
                flexDir="column"
                height="150px"
                justifyContent="center"
                alignItems={{ base: "center", sm: "unset" }}
              >
                <Text>CA moyen par collection</Text>
                <Flex gridGap={"10px"}>
                  <Image
                    src={ether}
                    width={{ base: "30px", md: "40px" }}
                    height={{ base: "30px", md: "40px" }}
                    marginTop="auto"
                    marginBottom="auto"
                  />
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="bold"
                    fontSize={{ base: "25px", md: "30px" }}
                    lineHeight={{ base: "20px", sm: "56px" }}
                  >
                    23
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default Dashboard;
