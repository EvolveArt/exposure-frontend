import { Box, Flex, Image, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import addIcon from "../../assets/imgs/plus.png";
import dropWrapper from "../../assets/imgs/dropWrapper.png";
import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import Footer from "../../components/Footer";
// import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import NftItem from "components/NFTitem";
// eslint-disable-next-line
import { Artist, Collection } from "interfaces";
import { useApi } from "api";
import { formatName, getRandomIPFS } from "utils";
import { TopPage } from "pages/CollectionPage";
import { Link } from "react-router-dom";

// import ArtistCard from "components/ArtistCard";

const ArtistsLanding = (artist: Artist) => {
  return (
    <Link to={`/artist/${artist.address}`}>
      <Flex
        flexDirection={"column"}
        paddingRight="12px"
        paddingLeft={"12px"}
        className={styles.artistComponent}
      >
        <Image
          src={getRandomIPFS(`ipfs://${artist.imageHash}`)}
          width="262px"
          height="262px"
          maxWidth={"unset"}
        ></Image>
        <Text fontWeight="600" fontSize="20px" lineHeight="35px">
          {formatName(artist)}
        </Text>
        <Text fontSize="12px" lineHeight="18px">
          <span style={{ fontWeight: "bold" }}>{0}</span> Collections
        </Text>
      </Flex>
    </Link>
  );
};

const LandingPage = () => {
  const [latestCollections, setLatestCollections] = useState<Collection[]>([]);

  const { getAllCollections, getAllArtists, getLatestCollection } = useApi();

  useEffect(() => {
    const updateCollections = async () => {
      const _collections = await getAllCollections(true, []);
      setLatestCollections(_collections.data.slice(0, 3));
    };

    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [artists, setArtists] = useState<Artist[]>([]);

  const [arrival, setArrival] = useState<Collection>({} as Collection);

  useEffect(() => {
    const updateArtists = async () => {
      const _artists = await getAllArtists();
      setArtists(_artists.data);
      // console.log(_artists);
    };
    updateArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateArrival = async () => {
      const _arrival = await getLatestCollection();
      setArrival(_arrival.data);
      // console.log(_artists);
    };
    updateArrival();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {TopPage(arrival, false)}
      {/* <Flex
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
      </Flex> */}
      <Box paddingBottom="112px">
        <Flex
          width={{ base: "90%", lg: "80%" }}
          height="fit-content"
          flexDirection="column"
          margin="auto"
          gridGap={"8px"}
          zIndex="1"
          borderLeft="1px solid #aaa"
          paddingLeft={"16px"}
          position={"relative"}
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
          <Image
            display={{ base: "none", md: "unset" }}
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            bottom={"-60px"}
            right="-7px"
          ></Image>
          <Image
            display={{ base: "none", md: "unset" }}
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            bottom={"-60px"}
            left="-7px"
          ></Image>
        </Flex>
      </Box>
      <Flex
        width={{ base: "90%", lg: "80%" }}
        height="fit-content"
        flexDirection="column"
        margin="auto"
        gridGap={"8px"}
        zIndex="1"
        position={"relative"}
      >
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-60px"}
          right="-10px"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-60px"}
          left="-7px"
        ></Image>
        <Flex
          position="relative"
          marginRight={"auto"}
          width={{ base: "88vw", lg: "80vw" }}
        >
          <Image
            src={dropWrapper}
            position="absolute"
            transform="translateX(-6px)"
            zIndex={"-1"}
            height="60px"
          />
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="30px"
            lineHeight="56px"
            paddingBottom={"32px"}
            marginLeft="10px"
          >
            Latest Drops
          </Text>
          <Link
            style={{
              textDecoration: "underline",
              position: "absolute",
              right: "0",
              top: "15px",
            }}
            to="/exploreCollection"
            className={styles.link}
          >
            View all collections
          </Link>
        </Flex>
        <Flex
          width={{ base: "unset", lg: "80vw" }}
          flexDirection={{ base: "column", md: "row" }}
          gridGap="24px"
          flexWrap={"wrap"}
          alignItems="center"
          justifyContent={"center"}
        >
          {latestCollections?.map((collection: Collection) =>
            NftItem(collection)
          )}
        </Flex>
      </Flex>
      <Flex
        position="relative"
        marginRight={"auto"}
        width={{ base: "88vw", lg: "80vw" }}
        margin="auto"
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
          paddingBottom={"32px"}
          marginLeft="10px"
        >
          Artists
        </Text>
        <Link
          style={{
            textDecoration: "underline",
            position: "absolute",
            right: "0",
            top: "15px",
          }}
          to="/artists"
          className={styles.link}
        >
          View all artists
        </Link>
      </Flex>
      <Box
        position={"relative"}
        width={{ base: "90%", lg: "80%" }}
        margin="auto"
        paddingBottom={"50px"}
      >
        <div className={styles.panelBody}>
          <div className={styles.itemsList}>
            {artists.map((item, idx) => (
              <>
                {idx < 10 && (
                  <div key={idx} className={styles.moreItem}>
                    {ArtistsLanding(item)}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"0px"}
          right="-10px"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"0px"}
          left="-7px"
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
          bottom={"0"}
          left="-7px"
        ></Image>
      </Box>
      <Footer />
    </div>
  );
};

export default LandingPage;
