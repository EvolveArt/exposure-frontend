import { Box, Flex, Text } from "@chakra-ui/react";
import { useApi } from "api";
import ArtistCard from "components/ArtistCard";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
// import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import Footer from "components/Footer";
// eslint-disable-next-line
import { Artist } from "interfaces";

const Artists = () => {
	const [artists, setArtists] = useState([]);

	const { getAllArtists } = useApi();

	useEffect(() => {
		const updateArtists = async () => {
			const _artists = await getAllArtists();
			setArtists(_artists.data);
			// console.log(_artists);
		};
		updateArtists();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header />
			<Flex
				width={{ base: "90%", lg: "80%" }}
				minHeight={"80vh"}
				flexDirection={"column"}
				paddingTop={"85px"}
				margin='auto'
				gridGap={"24px"}
				zIndex='1'
				paddingBottom={"100px"}
				position='relative'>
				<Flex
					position='relative'
					marginRight={"auto"}
					width={{ base: "88vw", lg: "80vw" }}
					margin='auto'
					marginTop={"100px"}>
					{/* <Image
						src={artistWrapper}
						position='absolute'
						transform='translate3d(-2px,3px,0px)'
						zIndex={"-1"}
						height='50px'
					/> */}
					<Text
						fontFamily='Inter'
						fontStyle='normal'
						fontWeight='bold'
						fontSize='30px'
						lineHeight='56px'
						paddingBottom={"32px"}
						marginLeft='10px'>
						Artists
					</Text>
				</Flex>
				<Box overflow={"hidden"} width='fit-content'>
					<Flex
						width={"full"}
						flexWrap='wrap'
						justifyContent={"flex-start"}
						alignItems='center'
						gridGap={"36px 0px"}>
						{artists.map((artist: Artist) => ArtistCard(artist))}
					</Flex>
				</Box>
			</Flex>
			<Footer />
		</div>
	);
};

export default Artists;
