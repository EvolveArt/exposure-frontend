import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  // useBreakpointValue,
} from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// import dropWrapper from "../../assets/imgs/dropWrapper.png";
// import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import Footer from "../../components/Footer";
// import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import NftItem from "components/NFTitem";
// eslint-disable-next-line
import { Artist, Collection, Season } from "interfaces";
import { useApi } from "api";
import { formatName } from "utils";
import { TopPage } from "pages/CollectionPage";
import { Link } from "react-router-dom";
import { getCDNLink } from "../../constants/cdn.constants";

// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import arrow from "../../assets/imgs/arrow.png";
import arrowButton from "../../assets/imgs/ArrowButton.png";

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
          // src={getRandomIPFS(`ipfs://${artist.imageHash}`)}
          src={getCDNLink(artist.imageHash)}
          width="262px"
          height="262px"
          maxWidth={"unset"}
        ></Image>
        <Text fontWeight="600" fontSize="20px" lineHeight="35px">
          {formatName(artist)}
        </Text>
        <Text fontSize="12px" lineHeight="18px">
          <span style={{ fontWeight: "bold" }}>{artist.nbCollections}</span>{" "}
          Collections
        </Text>
      </Flex>
    </Link>
  );
};

const LandingPage = () => {
  const [latestCollections, setLatestCollections] = useState<Collection[]>([]);
  const [seasonCollections, setSeasonCollections] = useState<Collection[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    getAllCollections,
    getAllArtists,
    getLatestCollection,
    getDisplayedSeason,
  } = useApi();

  // Settings for the slider
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  useEffect(() => {
    const updateCollections = async () => {
      const _collections = await getAllCollections(true, []);
      setLatestCollections(_collections.data.slice(0, 3));
    };

    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [displayedSeason, setDisplayedSeason] = useState<Season>({} as Season);

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

      const _season = await getDisplayedSeason();
      const _seasonCollections = await getAllCollections(
        true,
        [],
        undefined,
        _season.data._id
      );

      setDisplayedSeason(_season.data);
      setSeasonCollections(_seasonCollections.data);
      setArrival(_arrival.data);
      // console.log(_artists);
    };
    updateArrival();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Box className="top" />
      <Header />
      {TopPage(arrival, false)}
      <Flex
        justifyContent={"center"}
        alignItems="center"
        transform={"translateY(-80px)"}
        position="relative"
      >
        <Image src={arrow} display={{ base: "none", md: "unset" }} />
      </Flex>
      <Box paddingBottom="112px">
        <Flex
          width={{ base: "90%", lg: "80%" }}
          height="fit-content"
          flexDirection="column"
          margin="auto"
          gridGap={"8px"}
          zIndex="1"
          position={"relative"}
        >
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="30px"
            lineHeight="56px"
          >
            What is Rhapsody Curated ?
          </Text>
          <Text textAlign={"justify"} lineHeight="28px" whiteSpace="pre-wrap">
            Rhapsody Curated is a digital space bringing together the greatest
            photographic writings and facilitating, for NFT collectors, the
            exploration, the discovery and the collection of high quality
            photographic projects.{"\n"}
            <br />
            Each month, we curate a season of 3 to 5 photography projects
            selected according to a specific theme, composing what could be seen
            as an exhibition. To highlight the photographer&#39;s story and
            writing, we use a random drop system well known to NFT enthusiasts
            which consists of offering collectors the opportunity to acquire a
            photograph at random from the chosen series. Essentially, what the
            collector captures is a unique piece of the overall story told by
            the photographer.
          </Text>
        </Flex>
      </Box>
      <Flex
        bg="black"
        width="100vw"
        gridGap={{ base: "10px", md: "40px", lg: "80px" }}
        padding={{ base: "30px", md: "50px", lg: "100px" }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex
          width={{ base: "100%", md: "50%" }}
          flexDir="column"
          maxH={"600px"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Box
            position={"relative"}
            width={"full"}
            overflow={"hidden"}
            marginTop="auto"
          >
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {seasonCollections?.map((collection: Collection, index) => (
                <Box
                  my={"auto"}
                  key={index}
                  height={{
                    base: "300px",
                    sm: "450px",
                    md: "300px",
                    lg: "400px",
                    xl: "500px",
                  }}
                  position="relative"
                >
                  <Image
                    src={`${getCDNLink(collection?.logoImageHash)}`}
                    width="100%"
                  />
                  <Text
                    fontFamily="Inter"
                    fontSize="16px"
                    lineHeight="28px"
                    letterSpacing="1px"
                    color="#FFFFFF"
                    textAlign={"center"}
                    paddingTop="24px"
                  >
                    <span style={{ fontWeight: "700" }}>
                      {collection?.collectionName}
                    </span>{" "}
                    by {formatName(collection?.artists[0])}
                  </Text>
                </Box>
              ))}
            </Slider>
          </Box>
          <Flex gap="50px" margin="auto" alignItems="center" pt={"24px"}>
            <IconButton
              aria-label="left-arrow"
              colorScheme="white"
              borderRadius="full"
              border="1px solid white"
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <BiLeftArrowAlt />
            </IconButton>
            <Text color="white">
              {currentSlide + 1}/{seasonCollections?.length}
            </Text>
            {/* Right Icon */}
            <IconButton
              aria-label="right-arrow"
              colorScheme="white"
              borderRadius="full"
              border="1px solid white"
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <BiRightArrowAlt />
            </IconButton>
          </Flex>
        </Flex>
        {displayedSeason && (
          <Flex
            color="white"
            width={{ base: "100%", md: "50%" }}
            flexDir="column"
            pt={{ base: "30px", md: "unset" }}
          >
            <Heading size="md">Season - {displayedSeason.name}</Heading>
            <Text pt="16px" style={{ whiteSpace: "pre-wrap" }}>
              {displayedSeason.description}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex
        width={{ base: "90%", lg: "80%" }}
        height="fit-content"
        flexDirection="column"
        margin="auto"
        gridGap={"8px"}
        zIndex="1"
        pt="50px"
        position={"relative"}
      >
        <Flex
          position="relative"
          marginRight={"auto"}
          width={{ base: "88vw", lg: "80vw" }}
        >
          {/* <Image
						src={dropWrapper}
						position='absolute'
						transform='translateX(-6px)'
						zIndex={"-1"}
						height='60px'
					/> */}
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="30px"
            lineHeight="56px"
            paddingBottom={"32px"}
            marginLeft="10px"
          >
            Latest Series
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
            View all series
          </Link>
        </Flex>
        <Flex
          width={{ base: "unset", lg: "80vw" }}
          flexDirection={{
            base: "column",
            md: "row",
          }}
          gridGap="24px"
          flexWrap={"wrap"}
          alignItems="flex-start"
          justifyContent={"flex-start"}
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
        {/* <Image
					src={artistWrapper}
					position='absolute'
					transform='translate3d(-2px,3px,0px)'
					zIndex={"-1"}
					height='50px'
				/> */}
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="bold"
          fontSize="30px"
          lineHeight="56px"
          paddingBottom={"32px"}
          marginLeft="10px"
        >
          Photographers
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
          View all photographers
        </Link>
      </Flex>
      <a
        href={"#top"}
        style={{
          position: "fixed",
          bottom: "40px",
          right: " 40px",
          width: "40px",
          zIndex: "10",
        }}
      >
        <Image
          src={arrowButton}
          boxShadow="0px 8px 16px rgba(0, 0, 0, 0.12)"
          borderRadius={"full"}
        />
      </a>
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
      </Box>
      <Flex
        bg="#F8F8F8"
        p={10}
        pb={20}
        flexDir={["column", "row"]}
        justifyContent="space-between"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          m={5}

          maxWidth="300px"
          gap="8px"
        >
          <Image src="/images/icon-landscape.png" w="40px" h="40px" />
          <Text fontWeight="bold" mt="30px">
            Tight Curation
          </Text>
          <Text fontWeight="light">
            A rigorous curation of renowned and thought-provoking photography
            series.
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          m={5}
          maxWidth="300px"
          gap="8px"
        >
          <Image src="/images/icon-people.png" w="40px" h="40px" />
          <Text fontWeight="bold" mt="30px">
            Experts from both worlds
          </Text>
          <Text fontWeight="light">
            A team of photography and web3 professionals and enthusiasts.
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          m={5}
          maxWidth="300px"
          gap="8px"
        >
          <Image src="/images/icon-school.png" w="40px" h="40px" />
          <Text fontWeight="bold" mt="30px">
            Education events
          </Text>
          <Text fontWeight="light">
            Educating the photography world about NFT technology through talks
            and events.
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default LandingPage;
