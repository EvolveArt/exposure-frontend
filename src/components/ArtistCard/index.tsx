import { Flex, Image, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React from "react";
import { getRandomIPFS } from "utils";

const ArtistCard = (artists: {
	image: string;
	name: string;
	number: string | number;
}) => {
	return (
		<Flex
			flexDirection={"column"}
			paddingRight='12px'
			paddingLeft={"12px"}
			className={styles.artistComponent}>
			<Image
				src={getRandomIPFS(`ipfs://${artists.image}`)}
				width={240}
				height={280}></Image>
			<Text fontWeight='600' fontSize='20px' lineHeight='35px'>
				{artists.name}
			</Text>
			<Text fontSize='12px' lineHeight='18px'>
				<span style={{ fontWeight: "bold" }}>{artists.number}</span> Collections
			</Text>
		</Flex>
	);
};
export default ArtistCard;
