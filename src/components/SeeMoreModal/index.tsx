import React from "react";

import Modal from "../Modal";
import { Text } from "@chakra-ui/react";

// eslint-disable-next-line no-undef
// const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const SeeMoreModal = ({ visible, onClose, fullText }: any) => {
	return (
		<Modal
			visible={visible}
			secondTitle={"About the collection"}
			onClose={onClose}
			small>
			{fullText && <Text align='center'>{fullText}</Text>}
		</Modal>
	);
};

export default SeeMoreModal;
