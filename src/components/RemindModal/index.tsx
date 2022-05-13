import React, { useEffect, useState } from "react";
import cx from "classnames";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { SUPPORTED_WALLETS } from "constants/wallet";
import usePrevious from "hooks/usePrevious";

import Modal from "../Modal";
import styles from "./styles.module.scss";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useApi } from "api";
import { getSigner } from "contracts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/reduxStore";
import { ethers } from "ethers";
import AuthActions from "actions/auth.actions";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const RemindModal = ({ visible, onClose }: any) => {
	const { library, account } = useWeb3React();
	const [email, setEmail] = useState("");
	const { authToken } = useSelector((state: RootState) => state.ConnectWallet);

	const [saving, setSaving] = useState(false);

	const [emailError, setEmailError] = useState("");
	const { getNonce, updateAccountDetails } = useApi();

	const history = useHistory();
	const dispatch = useDispatch();

	const toast = useToast();

	const validEmail = (email: string) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

	const validateEmail = () => {
		if (email.length === 0 || validEmail(email)) {
			setEmailError("");
		} else {
			setEmailError("Invalid email address.");
		}
	};
	const onSave = async () => {
		if (saving) return;

		try {
			setSaving(true);

			const { data: nonce } = await getNonce(account, authToken);

			let signature;
			let addr;
			try {
				const signer = await getSigner(library);
				console.log("SIGNING", signer, library);
				let msg = `Approve Signature on Rhapsody with nonce ${nonce}`;

				signature = await library.send("personal_sign", [
					ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg)),
					account?.toLowerCase(),
				]);
				addr = ethers.utils.verifyMessage(msg, signature);
			} catch (err) {
				console.error(err);
				toast({
					status: "error",
					title:
						"You need to sign the message to be able to update account settings.",
				});
				setSaving(false);
				return;
			}

			const res = await updateAccountDetails(email, authToken, signature, addr);
			dispatch(AuthActions.fetchSuccess(res.data));
			toast({ status: "success", title: "Account details saved!" });
			setSaving(false);

			// Update bool and redirect
			history.replace("/");
		} catch {
			setSaving(false);
		}
	};

	return (
		<Modal
			visible={visible}
			secondTitle={"Remind Me !"}
			desc={"Remind Me when the collection is launching !"}
			onClose={onClose}
			small>
			<div>
				{/* <div className={styles.text}>
					Please fill with your email so we can remind you on the date!
				</div> */}
				<Flex
					border={"2px solid #000"}
					width='100%'
					marginBottom={"20px"}
					justifyContent='space-between'>
					<input
						className={styles.input}
						maxLength={100}
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={validateEmail}
					/>

					<Flex border={"1px solid #000"} width='20%'>
						<Button
							fontSize={"sm"}
							fontWeight={600}
							fontFamily={"Inter"}
							color={"white"}
							bg={"#000"}
							borderRadius='0px'
							width={"100%"}
							height={"64px"}
							style={{ marginInlineStart: "unset" }}
							_hover={{
								transform: "translate3d(4px,4px,0px)",
							}}
							onClick={onSave}>
							Confirm
						</Button>
					</Flex>
				</Flex>
				{emailError.length > 0 && <p className={styles.error}>{emailError}</p>}
			</div>
		</Modal>
	);
};

export default RemindModal;
