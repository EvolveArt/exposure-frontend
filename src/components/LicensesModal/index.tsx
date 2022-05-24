import React from "react";

import Modal from "../Modal";
import { Text } from "@chakra-ui/react";

// eslint-disable-next-line no-undef
// const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const LicensesModal = ({ visible, onClose }: any) => {
	return (
		<Modal visible={visible} secondTitle={"Licenses"} onClose={onClose}>
			<Text textAlign='center'>
				The photographers in the Rhapsody Curated family select their own
				license to apply to their series. Each series has its license that does
				not influence the other series in the Rhapsody Curated collection.
			</Text>
			<Text pt={3} textAlign='center'>
				- A<span style={{ fontWeight: "800" }}>« Limited »</span> license allows
				the owner of the NFT to display its image on social media, on
				marketplaces and in virtual spaces, all in a strictly non-commercial
				basis.
			</Text>
			<Text pt={3} textAlign='center'>
				- An <span style={{ fontWeight: "800" }}>« Extended Limited »</span>{" "}
				license allows the owner of the NFT to display its image on social
				media, on marketplaces and in virtual spaces but also to make a physical
				print of the image associated to the NFT for personal use limited to the
				family circle, all in a strictly non-commercial basis.{" "}
			</Text>
			<Text pt={3} textAlign='center'>
				For questions regarding further uses of the images associated with any
				Rhapsody Curated NFTs, contact us at{" "}
				<span style={{ fontWeight: "800" }}>contact@rhapsodycurated.com</span>{" "}
				or through our Twitter and we will put you in touch with the
				photographer or their agent.
			</Text>
		</Modal>
	);
};

export default LicensesModal;
