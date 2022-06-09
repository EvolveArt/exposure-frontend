import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useResizeDetector } from "react-resize-detector";
// import useWindowDimensions from "hooks/useWindowDimensions";
import iconCollapse from "assets/imgs/arrow.png";
import cx from "classnames";
import Header from "components/Header";
import { useApi } from "api";
import NftItem from "components/NFTitem";
import { CloseIcon } from "@chakra-ui/icons";
// eslint-disable-next-line
import { Artist, Collection } from "interfaces";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatName } from "utils";
import Footer from "../../components/Footer";
import filter from "../../assets/imgs/filter.png";

import { useWeb3React } from "@web3-react/core";
import ScrollToTop from "react-scroll-to-top";
import arrowButton from "../../assets/imgs/ArrowButton.png";

const ExploreCollection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const conRef: any = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [collections, setCollections] = useState<Collection[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selected, setSelected] = useState<Artist[]>([]);

  const { ref }: any = useResizeDetector();

  const { getAllCollections, getAllArtists } = useApi();
  const { account } = useWeb3React();

  useEffect(() => {
    const updateCollections = async () => {
      const _collections = await getAllCollections(
        isAvailable,
        selected.map((a: Artist) => a._id),
        account ?? ""
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
      <ScrollToTop
        smooth
        color="#000"
        component={<Image src={arrowButton} />}
        style={{ background: "unset" }}
      />
      <div
        ref={conRef}
        className={styles.container}
        // onScroll={width <= 600 ? handleScroll : null}
      >
        <div
          className={cx(
            styles.sidebar,
            collapsed && styles.collapsed,
            styles.isMobile
          )}
        >
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
                paddingTop={"8px"}
                onChange={(e: any) => handleAvailable(e, true)}
                css={`
                  > span:first-of-type {
                    box-shadow: unset;
                  }
                `}
              >
                <span className={styles.check}>Available</span>
              </Checkbox>
              <Checkbox
                paddingBottom={"8px"}
                paddingTop={"8px"}
                onChange={(e: any) => handleAvailable(e, false)}
                css={`
                  > span:first-of-type {
                    box-shadow: unset;
                  }
                `}
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
                    <Checkbox
                      css={`
                        > span:first-of-type {
                          box-shadow: unset;
                        }
                      `}
                      onChange={(e: any) => handleChangeArtists(artist)}
                    >
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
            <Box width={"100%"}>
              <Flex
                position="relative"
                marginRight={"auto"}
                width={{ base: "88vw", lg: "80vw" }}
              >
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize={{ base: "20px", md: "30px" }}
                  lineHeight="56px"
                  marginLeft="10px"
                >
                  Series
                </Text>
                <Button
                  onClick={onOpen}
                  leftIcon={<Image src={filter} width="15px" />}
                  border="unset"
                  bg={"unset"}
                  display={{ base: "unset", md: "none" }}
                  my="auto"
                  ml={"auto"}
                  _focus={{ outline: "none !important" }}
                  _hover={{ background: "#fff" }}
                >
                  Filter
                </Button>
                <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent height={"100vh"}>
                    <DrawerHeader
                      borderBottomWidth="1px"
                      display={"flex"}
                      flexDir={"row"}
                    >
                      <Text
                        fontFamily="Inter"
                        fontWeight="600"
                        fontSize="20px"
                        pt={"6px"}
                      >
                        Filter
                      </Text>
                      <Button
                        leftIcon={<CloseIcon />}
                        ml="auto"
                        onClick={onClose}
                        bg="unset"
                        border={"unset"}
                        _focus={{ outline: "none !important" }}
                        _hover={{ background: "#fff" }}
                      />
                    </DrawerHeader>
                    <DrawerBody padding="unset">
                      <div className={styles.filterList}>
                        <div className={styles.filterList}>
                          <div className={styles.titleFilter}>Availability</div>
                          <Checkbox
                            paddingTop={"8px"}
                            isChecked={
                              isAvailable === null ? false : isAvailable
                            }
                            onChange={(e: any) => handleAvailable(e, true)}
                            css={`
                              > span:first-of-type {
                                box-shadow: unset;
                              }
                            `}
                          >
                            <span className={styles.check}>Available</span>
                          </Checkbox>
                          <Checkbox
                            paddingBottom={"8px"}
                            paddingTop={"8px"}
                            isChecked={
                              isAvailable === null ? false : !isAvailable
                            }
                            onChange={(e: any) => handleAvailable(e, false)}
                            css={`
                              > span:first-of-type {
                                box-shadow: unset;
                              }
                            `}
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
                                <Checkbox
                                  css={`
                                    > span:first-of-type {
                                      box-shadow: unset;
                                    }
                                  `}
                                  isChecked={
                                    selected.find(
                                      (a: Artist) => a._id === artist._id
                                    ) !== undefined
                                  }
                                  onChange={(e: any) =>
                                    handleChangeArtists(artist)
                                  }
                                >
                                  <span className={styles.check}>
                                    {formatName(artist)}
                                  </span>
                                </Checkbox>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Flex>
            </Box>
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
