import {
  Button,
  Flex,
  Image,
  Text,
  Link,
  // useRadio,
  useRadioGroup,
  Box,
  HStack,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Zoom from "react-medium-image-zoom";
// import copyRights from "../../assets/imgs/copyright.png";
// import ticon from "../../assets/imgs/t.png";
// import mintType from "../../assets/imgs/mintType.png";
// import agenda from "../../assets/imgs/agenda.png";
// import available from "../../assets/imgs/available.png";
// import ether from "../../assets/imgs/ether.png";
import {
  copyRights,
  mintType,
  agenda,
  available,
  ether,
  getCDNLink,
} from "../../constants/cdn.constants";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useApi } from "api";
// eslint-disable-next-line
import { Collection } from "interfaces";
import { formatError, formatName } from "utils";
// import showToast from "utils/toast";
import { useExposureContract, useSalesContract } from "contracts";
import { useWeb3React } from "@web3-react/core";
// eslint-disable-next-line
import { BigNumber, ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
// import Loader from "react-loader-spinner";
// import SuspenseImg from "components/SuspenseImg";
// import styles from "./styles.module.scss";
import { ADMIN_ADDRESSES } from "constants/index";
// import axios from "axios";
// import NftItem from "components/NFTitem";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { RootState } from "stores/reduxStore";
import { BsTextLeft } from "react-icons/bs";
import { CalendarIcon, QuestionIcon } from "@chakra-ui/icons";
import ModalActions from "actions/modal.actions";
import RemindModal from "components/RemindModal";
import { useIsOverflow } from "hooks/useIsOverflow";
import SeeMoreModal from "components/SeeMoreModal";
import MintModal from "components/MintModal";
import LicensesModal from "components/LicensesModal";
import axios from "axios";
import { Contracts } from "constants/networks";

interface DropInfo {
  artist: string;
  circulating: BigNumber;
  max: BigNumber;
  exists: boolean;
  paused: boolean;
}

export const TopPage = (collection: Collection, extend: boolean) => {
  const { purchase, purchaseThroughAuction, getPrice } = useSalesContract();
  const { getDropInfo, unpauseDrop } = useExposureContract();
  const [minting, setMinting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [auctionPrice, setAuctionPrice] = useState("0");
  const { account } = useWeb3React();
  const [dropInfo, setDropInfo] = useState<DropInfo>({} as DropInfo);
  const { updateMint, publishDrop } = useApi();

  const { authToken } = useSelector((state: RootState) => state.ConnectWallet);
  const {
    remindModalVisible,
    seeMoreModalVisible,
    mintModalVisible,
    licensesModalVisible,
  } = useSelector((state: RootState) => state.Modal);

  const toast = useToast();
  const dispatch = useDispatch();
  // const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMint = async () => {
    if (minting) return;
    setMinting(true);

    try {
      // console.log(typeof collection?.mintMode);
      if (collection?.mintMode === "0") {
        const tx = await purchaseThroughAuction(
          collection.dropId,
          auctionPrice.toString(),
          account
        );
        await tx.wait();
      } else {
        const tx = await purchase(
          collection.dropId,
          1,
          ethers.utils.parseEther(collection.mintPrice.toString()),
          account
        );
        await tx.wait();
      }
      await updateMint(
        collection.dropId,
        1,
        ethers.utils.parseEther(collection.mintPrice.toString()).toString(),
        account
      );
      toast({ status: "success", title: "NFT Minted!" });
      setMinting(false);
    } catch (error) {
      console.error(error);
      toast({ status: "error", title: formatError(error) });
      setMinting(false);
    }
  };

  const updateAuctionPrice = async () => {
    if (collection?.dropId === undefined) return;
    setUpdating(true);
    let _currentPrice = await getPrice(collection?.dropId);
    setAuctionPrice(_currentPrice);
    setUpdating(false);
  };

  const handlePause = async () => {
    try {
      const _shouldUnpause = dropInfo.paused;
      const tx = await unpauseDrop(collection.dropId, _shouldUnpause, account);
      await tx.wait();

      toast({ status: "success", title: "Pause Changed" });
    } catch (error) {
      console.error(error);
      toast({ status: "error", title: formatError(error) });
    }
  };

  const handlePublish = async () => {
    try {
      const _shouldPublish = dropInfo.paused;
      await publishDrop(collection.dropId, _shouldPublish, authToken);

      toast({ status: "success", title: "Pause Changed" });
    } catch (error) {
      console.error(error);
      toast({ status: "error", title: formatError(error) });
    }
  };

  useEffect(() => {
    if (collection?.mintMode === "1") return;
    const _intervalId = setInterval(() => updateAuctionPrice(), 5000);
    updateAuctionPrice();

    return () => clearInterval(_intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection?.mintMode]);

  useEffect(() => {
    const updateDropInfo = async () => {
      const _drop = await getDropInfo(collection.dropId);
      setDropInfo(_drop);
    };

    if (collection && collection.dropId !== undefined) {
      updateDropInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection?.dropId]);

  const _isAdmin = useMemo(
    () => account && ADMIN_ADDRESSES.includes(account.toLowerCase()),
    [account]
  );

  const ref = useRef();
  const isOverflow = useIsOverflow(ref);

  return (
    <>
      <RemindModal
        visible={remindModalVisible}
        onClose={() => dispatch(ModalActions.hideRemindModal())}
        collection={collection}
      />
      <LicensesModal
        visible={licensesModalVisible}
        onClose={() => dispatch(ModalActions.hideLicensesModal())}
      />
      <SeeMoreModal
        visible={seeMoreModalVisible}
        onClose={() => dispatch(ModalActions.hideSeeMoreModal())}
        fullText={collection?.description}
      />
      <MintModal
        visible={mintModalVisible}
        collection={collection}
        price={
          collection?.mintMode === "0"
            ? ethers.utils.formatEther(auctionPrice)
            : collection?.mintPrice
        }
        onClose={() => dispatch(ModalActions.hideMintModal())}
      />
      {collection?.private && !_isAdmin ? (
        <>
          <Flex padding={"30px"} display={{ base: "none", md: "unset" }} />
          <Flex
            width={{ base: "90%", lg: "80%" }}
            minHeight={"80vh"}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems={"center"}
            paddingTop={"85px"}
            margin="auto"
            gridGap={"24px"}
            zIndex="1"
            paddingBottom={"100px"}
            position="relative"
          >
            <Flex
              width={{
                base: "100%",
                md: "calc(60% - 12px)",
                lg: "calc(50% - 12px)",
              }}
              height={{ base: "fit-content", md: "80vh" }}
              paddingTop={{ base: "50px", md: "unset" }}
              paddingBottom={{ base: "50px", md: "unset" }}
              justifyContent={{ base: "center", md: "end" }}
              alignItems="center"
              position="relative"
            ></Flex>
            <Flex
              flexDirection={"column"}
              width={{
                base: "100%",
                md: "calc(40% - 12px)",
                lg: "calc(50% - 12px)",
              }}
              height={{ base: "fit-content", md: "80vh" }}
              justifyContent="center"
              position="relative"
              paddingLeft={{ base: "unset", md: "50px", lg: "70px" }}
              paddingBottom={{ base: "50px", md: "unset" }}
              paddingTop="50px"
            ></Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex padding={"30px"} display={{ base: "none", md: "unset" }} />
          <Flex
            width={{ base: "90%", lg: "80%" }}
            minHeight={"100vh"}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems={"center"}
            paddingTop={"100px"}
            margin="auto"
            gridGap={"24px"}
            zIndex="1"
            paddingBottom={"100px"}
            position="relative"
          >
            <Flex
              width={{
                base: "100%",
                md: "calc(60% - 12px)",
                lg: "calc(50% - 12px)",
              }}
              height={{ base: "fit-content", md: "80vh" }}
              paddingTop={{ base: "50px", md: "unset" }}
              paddingBottom={{ base: "50px", md: "unset" }}
              justifyContent={{ base: "center", md: "center" }}
              alignItems="center"
              position="relative"
            >
              <Zoom>
                <Image
                  // src={getRandomIPFS(`ipfs://${collection?.logoImageHash}`)}
                  src={getCDNLink(collection?.logoImageHash)}
                  boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.15)"
                  width={"100%"}
                  maxHeight={"65vh"}
                ></Image>
              </Zoom>
            </Flex>
            <Flex
              flexDirection={"column"}
              width={{
                base: "100%",
                md: "calc(40% - 12px)",
                lg: "calc(50% - 12px)",
              }}
              height={{ base: "fit-content", md: "80vh" }}
              justifyContent="center"
              position="relative"
              paddingLeft={{ base: "unset", md: "50px", lg: "70px" }}
              paddingBottom={{ base: "50px", md: "unset" }}
              paddingTop="50px"
            >
              <Box paddingBottom="50px">
                {collection?.season && (
                  <Flex flexDirection={"row"} gridGap="9px">
                    <Text
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="800"
                      fontSize="16px"
                      lineHeight="28px"
                    >
                      Season - {collection.season.name}{" "}
                    </Text>
                  </Flex>
                )}
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="800"
                  fontSize="30px"
                  lineHeight="56px"
                >
                  {collection?.collectionName}
                </Text>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize={"16px"}
                  lineHeight="28px"
                  paddingBottom={"24px"}
                >
                  By{" "}
                  {collection?.artists
                    ? formatName(collection?.artists[0])
                    : "Unknown"}
                </Text>
                {extend ? (
                  <>
                    <Box overflow="hidden" ref={ref as any}>
                      <Text
                        className={styles.descriptionText}
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="normal"
                        fontSize={"16px"}
                        lineHeight="28px"
                      >
                        {collection?.description}
                      </Text>
                    </Box>
                    {isOverflow && (
                      <Text
                        fontWeight="bold"
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(ModalActions.showSeeMoreModal())
                        }
                      >
                        See More
                      </Text>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <Flex flexDirection={"row"} gridGap="9px">
                  <Image src={mintType} width="29px" height="29px" />
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize="16px"
                    lineHeight="28px"
                    paddingBottom={"8px"}
                  >
                    {collection?.mintMode === "0"
                      ? "Dutch Auction"
                      : "Random Mint"}
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
                    paddingBottom={"8px"}
                  >
                    Mint price -{" "}
                    {updating ? (
                      <Skeleton width={60} style={{ background: "black" }} />
                    ) : (
                      <span style={{ fontWeight: "800" }}>
                        {collection?.mintMode === "0"
                          ? ethers.utils.formatEther(auctionPrice)
                          : collection?.mintPrice}{" "}
                        ETH
                      </span>
                    )}
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
                    paddingBottom={"8px"}
                  >
                    Mint available -{" "}
                    <span style={{ fontWeight: "800" }}>
                      {dropInfo?.max?.toNumber() -
                        dropInfo?.circulating?.toNumber()}{" "}
                      / {dropInfo?.max?.toNumber()}
                    </span>
                  </Text>
                </Flex>
                {collection?.copyRights && (
                  <Flex flexDirection={"row"} gridGap="9px">
                    <Image
                      src={copyRights}
                      width="27px"
                      height="27px"
                      mt={"6px"}
                      ml="1px"
                    />
                    <Text
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="normal"
                      fontSize="16px"
                      lineHeight="28px"
                      paddingBottom={"8px"}
                      ml="1px"
                    >
                      Licence -{" "}
                      <span style={{ fontWeight: "800" }}>
                        {collection?.copyRights}{" "}
                      </span>{" "}
                      <IconButton
                        aria-label="licenses-modal"
                        bg="transparent"
                        _focus={{ border: "none", bg: "transparent" }}
                        _hover={{ border: "none", bg: "transparent" }}
                        icon={<QuestionIcon />}
                        onClick={() =>
                          dispatch(ModalActions.showLicensesModal())
                        }
                      />
                    </Text>
                  </Flex>
                )}
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
                    <span style={{ fontWeight: "800" }}>
                      {new Date(collection?.releaseDate || "").toUTCString()}{" "}
                    </span>{" "}
                    {/* at{" "}
							<span style={{ fontWeight: "800" }}>
								{collection?.releaseDate} GMT
							</span> */}
                  </Text>
                </Flex>
                {extend ? (
                  <>
                    {new Date(collection?.releaseDate || "").getTime() >
                    new Date().getTime() ? (
                      <Flex border={"1px solid #000"} width="100%">
                        <Button
                          leftIcon={<CalendarIcon />}
                          fontSize={"16px"}
                          lineHeight="20px"
                          fontWeight={"700"}
                          fontFamily={"Inter"}
                          color={"black"}
                          bg={"white"}
                          borderRadius="0px"
                          width={"100%"}
                          height={"54px"}
                          style={{ marginInlineStart: "unset" }}
                          // _hover={{
                          // 	transform: "translate3d(4px,4px,0px)",
                          // }}
                          onClick={() =>
                            dispatch(ModalActions.showRemindModal())
                          }
                          _focus={{ outline: "none !important" }}
                        >
                          Remind Me
                        </Button>
                      </Flex>
                    ) : (
                      <>
                        {collection?.soldOut ? (
                          <Box
                            width={"100%"}
                            paddingTop="30px"
                            display={"flex"}
                            alignItems="center"
                            justifyContent={"center"}
                          >
                            <Link
                              fontWeight={"700"}
                              href={`https://testnets.opensea.io/assets/rhapsody?search[stringTraits][0][name]=Collection&search[stringTraits][0][values][0]=${collection?.collectionName}&search[sortAscending]=true&search[sortBy]=PRICE`}
                              target="_blank"
                              _focus={{ outline: "none !important" }}
                            >
                              See collection on Opensea
                            </Link>
                          </Box>
                        ) : (
                          <Flex border={"1px solid #000"} width="100%">
                            <Button
                              fontSize={"16px"}
                              lineHeight="20px"
                              fontWeight={"700"}
                              fontFamily={"Inter"}
                              color={"white"}
                              bg={"#000"}
                              borderRadius="0px"
                              width={"100%"}
                              height={"54px"}
                              style={{ marginInlineStart: "unset" }}
                              _hover={{
                                transform: "translate3d(4px,4px,0px)",
                              }}
                              onClick={() =>
                                dispatch(ModalActions.showMintModal())
                              }
                              _focus={{ outline: "none !important" }}
                            >
                              Mint
                            </Button>
                          </Flex>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Flex border={"1px solid #000"} width="100%">
                      <Button
                        leftIcon={<CalendarIcon />}
                        fontSize={"16px"}
                        lineHeight="20px"
                        fontWeight={"700"}
                        fontFamily={"Inter"}
                        color={"black"}
                        bg={"white"}
                        borderRadius="0px"
                        width={"100%"}
                        height={"54px"}
                        style={{ marginInlineStart: "unset" }}
                        // _hover={{
                        // 	transform: "translate3d(4px,4px,0px)",
                        // }}
                        onClick={() => dispatch(ModalActions.showRemindModal())}
                        _focus={{ outline: "none !important" }}
                      >
                        Remind Me
                      </Button>
                    </Flex>
                    <Flex border={"1px solid #000"} width="100%" mt={2}>
                      <Button
                        leftIcon={<BsTextLeft />}
                        fontSize={"16px"}
                        lineHeight="20px"
                        fontWeight={"700"}
                        fontFamily={"Inter"}
                        color={"white"}
                        bg={"#000"}
                        borderRadius="0px"
                        width={"100%"}
                        height={"54px"}
                        style={{ marginInlineStart: "unset" }}
                        _hover={{
                          transform: "translate3d(4px,4px,0px)",
                        }}
                        as={RouterLink}
                        to={`/collection/${collection?.dropId}`}
                        _focus={{ outline: "none !important" }}
                      >
                        Full Details
                      </Button>
                    </Flex>
                  </>
                )}
              </Box>
            </Flex>
          </Flex>
          {account &&
            ADMIN_ADDRESSES.includes(account.toLowerCase()) &&
            extend && (
              <Flex
                width={"80%"}
                margin="auto"
                gridGap="20px"
                flexWrap={"wrap"}
                justifyContent="center"
                alignItems={"center"}
                padding="40px"
              >
                <Flex border={"1px solid #000"} width="fit-content">
                  <Button
                    fontSize={"16px"}
                    lineHeight="20px"
                    fontWeight={"700"}
                    fontFamily={"Inter"}
                    color={"white"}
                    bg={"#000"}
                    borderRadius="0px"
                    height={"64px"}
                    padding="10px 50px"
                    style={{ marginInlineStart: "unset" }}
                    _hover={{
                      transform: "translate3d(4px,4px,0px)",
                    }}
                    onClick={handlePause}
                    _focus={{ outline: "none !important" }}
                  >
                    {dropInfo?.paused ? "Unpause" : "Pause"}
                  </Button>
                </Flex>
                <Flex border={"1px solid #000"} width="fit-content">
                  <Button
                    fontSize={"16px"}
                    lineHeight="20px"
                    fontWeight={"700"}
                    fontFamily={"Inter"}
                    color={"white"}
                    bg={"#000"}
                    borderRadius="0px"
                    height={"64px"}
                    padding="10px 50px"
                    style={{ marginInlineStart: "unset" }}
                    _hover={{
                      transform: "translate3d(4px,4px,0px)",
                    }}
                    onClick={handlePublish}
                    _focus={{ outline: "none !important" }}
                  >
                    {collection?.private ? "Publish" : "Hide"}
                  </Button>
                </Flex>
                {/* <Flex border={"1px solid #000"} width='fit-content'>
						<Button
							fontSize={"16px"}
							lineHeight='20px'
							fontWeight={"700"}
							fontFamily={"Inter"}
							color={"white"}
							bg={"#000"}
							borderRadius='0px'
							height={"64px"}
							padding='10px 50px'
							style={{ marginInlineStart: "unset" }}
							_hover={{
								transform: "translate3d(4px,4px,0px)",
							}}></Button>
					</Flex>
					<Flex border={"1px solid #000"} width='fit-content'>
						<Button
							fontSize={"16px"}
							lineHeight='20px'
							fontWeight={"700"}
							fontFamily={"Inter"}
							color={"white"}
							bg={"#000"}
							borderRadius='0px'
							height={"64px"}
							padding='10px 50px'
							style={{ marginInlineStart: "unset" }}
							_hover={{
								transform: "translate3d(4px,4px,0px)",
							}}>
							Un autre
						</Button>
					</Flex>
					<Flex border={"1px solid #000"} width='fit-content'>
						<Button
							fontSize={"16px"}
							lineHeight='20px'
							fontWeight={"700"}
							fontFamily={"Inter"}
							color={"white"}
							bg={"#000"}
							borderRadius='0px'
							height={"64px"}
							padding='10px 50px'
							style={{ marginInlineStart: "unset" }}
							_hover={{
								transform: "translate3d(4px,4px,0px)",
							}}>
							Un bouton
						</Button>
					</Flex> */}
              </Flex>
            )}
          {extend && (
            <Flex
              width={{ base: "90%", lg: "80%" }}
              flexDirection="column"
              justifyContent="center"
              alignItems={"center"}
              margin="auto"
              zIndex="1"
              border="solid 2px #000"
            >
              <Text
                fontWeight="800"
                fontSize={{ base: "20px", md: "30px" }}
                lineHeight={{ base: "40px", md: "53px" }}
                textAlign={"center"}
                paddingTop="25px"
                paddingLeft="32px"
                paddingRight={"32px"}
                paddingBottom="20px"
              >
                {collection?.verbatim}
              </Text>
              <Text paddingBottom={"25px"} fontSize="16px" lineHeight={"28px"}>
                {collection?.verbatimAuthor}
              </Text>
            </Flex>
          )}
        </>
      )}
    </>
  );
};

// function RadioCard(props: any) {
//   const { getInputProps, getCheckboxProps } = useRadio(props);

//   const input = getInputProps();
//   const checkbox = getCheckboxProps();

//   return (
//     <Box as="label">
//       <input {...input} />
//       <Box
//         {...checkbox}
//         cursor="pointer"
//         _checked={{
//           filter: "brightness(0) saturate(100%)",
//         }}
//         padding="5px"
//       >
//         {props.children}
//       </Box>
//     </Box>
//   );
// }

const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const CollectionPage = () => {
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  );

  // const { account } = useWeb3React();

  const { getCollectionInfo } = useApi();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<any[]>(["", "", ""]);

  const { getRootProps /*, getRadioProps*/ } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const { dropId }: any = useParams();

  useEffect(() => {
    const fetchCurrentCollection = async () => {
      const _collection: any = await getCollectionInfo(dropId);
      console.log({ _collection });
      setCurrentCollection(_collection.data);
    };

    if (dropId) {
      fetchCurrentCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropId]);
  
  const apiKey = process.env.REACT_APP_ALCHEMY_KEY;
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadAvailablePhotographs = async () => {
  	const _totalSupply = currentCollection?.totalSupply || 0;
  	// const images = [];
  	for (let index = 0; index < _totalSupply; index++) {
  		try {
  			const response = await axios({
          method: "get",
          url: `${baseURL}?tokenId=${index}&contractAddress=${Contracts[
            isMainnet ? 1 : 4
          ].ExposureMain.toLowerCase()}`,
        });
  			setImages((prevState: any) => [...prevState, response.data]);
  			// images.push(_metadata.data);
  			// console.log(_metadata.data);
  		} catch (error) {
  			console.log(error);
  		}
  	}

  	// setImages(images);
  };
  //QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH
  useEffect(() => {
  	loadAvailablePhotographs();
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCollection]);

  // const _isAdmin = useMemo(
  // 	() => account && ADMIN_ADDRESSES.includes(account.toLowerCase()),
  // 	[account]
  // );


  const group = getRootProps();
  return (
    <div>
      <Header />
      {TopPage(currentCollection as Collection, true)}
      <Flex
        position="relative"
        margin={"auto"}
        width={{ base: "88vw", lg: "80vw" }}
        marginTop="150px"
      >
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="bold"
          fontSize="30px"
          lineHeight="56px"
          paddingBottom={"32px"}
          marginLeft="10px"
        >
          Available photographs
        </Text>

        <HStack
          {...group}
          position="absolute"
          right="0"
          top="15px"
          display={{ base: "none", md: "flex" }}
          flexDirection="row"
        ></HStack>
      </Flex>
      <Flex
        width={{ base: "90%", lg: "80%" }}
        flexWrap="wrap"
        justifyContent={"center"}
        alignItems="center"
        margin={"auto"}
        gridGap={"24px"}
        position="relative"
        paddingBottom={"150px"}
      >
        {Array.apply(0, Array(currentCollection?.totalSupply)).map(function(
          x,
          index
        ) {
          return (
            <Flex
              width={{ base: "100%", sm: "90%", md: "calc(33.33% - 16px)" }}
              flexDir={"column"}
              borderRadius={"2px"}
              key={index}
              className={styles.dropContainer}
            >
              <Zoom>
                <Flex
                  width="100%"
                  position="relative"
                  paddingBottom="100%"
                  boxSizing="border-box"
                  className={styles.imageContainer}
                >
                  {/* <Zoom> */}
                  <Image
                    src={getCDNLink(`${dropId}-${index}`)}
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    backgroundSize="contain"
                    objectFit="contain"
                    border="0"
                    padding="8px"
                  ></Image>
                  {/* </Zoom> */}
                </Flex>
              </Zoom>
              <Flex
                flexDirection={"column"}
                paddingLeft="8px"
                gridGap={"8px"}
                paddingBottom="8px"
              >
                <Text
                  fontStyle="normal"
                  fontWeight="600"
                  fontSize="20px"
                  lineHeight="35px"
                  paddingTop="19px"
                >
                  {images[index].metadata.name} 
                </Text>
                <Text fontWeight="normal" fontSize="14px" lineHeight="28px">
                  By{" "}
                  {
										images[index].metadata.attributes.find((a: any) => a.trait_type === "Artist")
											.value
									}
                  
                </Text>
                {/* <Text fontSize='12px' lineHeight='18px'>
									<span style={{ fontWeight: "bold" }}>
										{collection.totalSupply}{" "}
									</span>
									photos
								</Text> */}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Footer />
    </div>
  );
};

export default CollectionPage;
