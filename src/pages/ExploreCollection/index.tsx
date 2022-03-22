import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useResizeDetector } from "react-resize-detector";
// import useWindowDimensions from "hooks/useWindowDimensions";
import iconCollapse from "assets/imgs/arrow.png";
import cx from "classnames";
import Header from "components/Header";
import { useApi } from "api";
import NftItem from "components/NFTitem";
// eslint-disable-next-line
import { Artist, Collection } from "interfaces";
import { Box, Checkbox, Flex, Image, Link } from "@chakra-ui/react";
import { formatName } from "utils";
// import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import logo from "../../assets/imgs/logoWhite.png";
import twitter from "../../assets/imgs/twitter.png";
import discord from "../../assets/imgs/discord.png";
import instagram from "../../assets/imgs/instagram.png";
import addIcon from "../../assets/imgs/plus1.png";

const Footer = () => {
  return (
    <div>
      <Flex minH={"300px"} backgroundColor="#000" flexDirection="column">
        <Box
          position={"relative"}
          width={{ base: "90%", lg: "80%" }}
          marginLeft="auto"
          marginRight={"auto"}
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            marginRight="auto"
            marginLeft="auto"
            paddingTop="45px"
            position={"relative"}
            height={{ base: "fit-content" }}
            width="100%"
          >
            <Link href="/#">
              <Image src={logo} height="38px" margin="auto"></Image>
            </Link>
            <Flex
              paddingTop={{ base: "32px", md: "unset" }}
              marginLeft={{ base: "unset", md: "auto" }}
              gridGap={{ base: "24px", md: "32px" }}
              marginTop={"auto"}
              marginBottom="auto"
              flexDirection={{ base: "column", md: "row" }}
            >
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Curated drop
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
                href="/exploreCollection"
              >
                Collections
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
                href={"/artists"}
              >
                Artists
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
                href={"/QA"}
              >
                Help Center
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Contact us
              </Link>
            </Flex>
          </Flex>
          <Flex
            margin="auto"
            gridGap={"20px"}
            width="fit-content"
            paddingTop={"90px"}
            paddingBottom={{ base: "110px", md: "unset" }}
          >
            <Link href={"https://instagram.com/exposure_art_"}>
              <Image src={instagram} height="30px" />
            </Link>
            <Link href={"https://twitter.com/exposure_art_"}>
              <Image src={twitter} height="30px" margin="auto" />
            </Link>
            <Link href={"https://discord.com/invite/gGfeUXCVWD"}>
              <Image src={discord} height="30px" />
            </Link>
          </Flex>
          <Image
            src={addIcon}
            width={"16px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            right="-10px"
          ></Image>
          <Image
            src={addIcon}
            width={"16px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            left="0"
            right="0"
            marginLeft="auto"
            marginRight="auto"
            zIndex={"10"}
          ></Image>
          <Image
            src={addIcon}
            width={"16px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            left="0px"
          ></Image>
        </Box>
      </Flex>
    </div>
  );
};

const ExploreCollection = () => {
  const conRef: any = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [collections, setCollections] = useState<Collection[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selected, setSelected] = useState<Artist[]>([]);

  const { ref }: any = useResizeDetector();

  const { getAllCollections, getAllArtists } = useApi();

  useEffect(() => {
    const updateCollections = async () => {
      const _collections = await getAllCollections(
        isAvailable,
        selected.map((a: Artist) => a._id)
      );
      setCollections(_collections.data);
    };

    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAvailable, selected]);

  const handleAvailable = async (event: any, _isAvailable: boolean) => {
    if (event.target.checked) {
      setIsAvailable(_isAvailable);
    } else {
      setIsAvailable(null);
    }

    // console.log(isAvailable);
  };

  const handleChangeArtists = (_artist: Artist) => {
    let newArtists: Artist[];
    if (selected.find((s: Artist) => s.address === _artist.address)) {
      // remove the _artist from selected
      newArtists = selected.filter(
        (a: Artist) => a.address !== _artist.address
      );
    } else {
      // add the _artist to selected
      newArtists = [...selected, _artist];
    }
    setSelected(newArtists);
  };

  useEffect(() => {
    const updateArtists = async () => {
      const _artists = await getAllArtists();
      setArtists(_artists.data);
    };
    updateArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div
        ref={conRef}
        className={styles.container}
        // onScroll={width <= 600 ? handleScroll : null}
      >
        <div className={cx(styles.sidebar, collapsed && styles.collapsed)}>
          <div className={styles.sidebarHeader}>
            {!collapsed && <div className={styles.sidebarTitle}>Filter</div>}
            <img
              src={iconCollapse}
              className={styles.iconCollapse}
              onClick={() => setCollapsed(!collapsed)}
              alt="collapse-menu"
            />
          </div>
          <div className={styles.filterList}>
            <div className={styles.filterList}>
              <div className={styles.titleFilter}>Availability</div>
              <Checkbox
                paddingBottom={"8px"}
                paddingTop={"8px"}
                onChange={(e) => handleAvailable(e, true)}
              >
                <span className={styles.check}>Available</span>
              </Checkbox>
              <Checkbox
                paddingBottom={"8px"}
                paddingTop={"8px"}
                onChange={(e) => handleAvailable(e, false)}
              >
                <span className={styles.check}>Sold Out</span>
              </Checkbox>
            </div>
            <div className={styles.filterList}>
              <div
                className={styles.titleFilter}
                style={{ paddingBottom: "8px" }}
              >
                Photographer
              </div>
              <div className={styles.filterLists}>
                {artists.map((artist: Artist) => {
                  return (
                    <Checkbox onChange={(e) => handleChangeArtists(artist)}>
                      <span className={styles.check}>{formatName(artist)}</span>
                    </Checkbox>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div
            ref={ref}
            className={styles.exploreAll}
            // onScroll={width > 600 ? handleScroll : null}
          >
            {collections.map((collection: Collection) => {
              return NftItem(collection);
            })}
            {/* <CollectionsGrid
							items={collections}
							uploading={upFetching}
							loading={downFetching}
							numPerRow={numPerRow}
							category={category}
						/> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreCollection;
