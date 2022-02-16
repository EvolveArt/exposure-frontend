import { Flex, Image } from "@chakra-ui/react";
import { useApi } from "api";
import ArtistCard from "components/ArtistCard";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";

const Artists = () => {
	const [artists, setArtists] = useState([]);

	const { getAllArtists } = useApi();

	useEffect(() => {
		const updateArtists = async () => {
			const _artists = await getAllArtists();
			setArtists(_artists.data);
			console.log(_artists);
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
				{" "}
				<Image
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					top={"100px"}
					left='0'></Image>
				<Image
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					top={"100px"}
					right={{ base: "0", md: "-0px" }}></Image>
				<Image
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					bottom={"-20px"}
					right='0'></Image>
				<Image
					display={{ base: "unset", md: "none" }}
					src={ticon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					top={"114px"}
					right='50%'
					left='50%'></Image>
				<Image
					display={{ base: "none", md: "unset" }}
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					top={"114px"}
					right='50%'
					left='50%'></Image>
				<Image
					display={{ base: "unset", md: "none" }}
					src={ticon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					transform={"rotate(180deg)"}
					bottom={"-6px"}
					right='50%'
					left='50%'></Image>
				<Image
					display={{ base: "none", md: "unset" }}
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					bottom={"-20px"}
					right='50%'
					left='50%'></Image>
				<Image
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					bottom={"-20px"}
					left='0'></Image>
				{artists.map((artist: any) => (
					<ArtistCard
						image={artist.imageHash}
						name={artist.firstname + " " + artist.lastname}
						number={0}
					/>
				))}
			</Flex>
		</div>
	);
};

export default Artists;
