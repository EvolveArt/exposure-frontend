import { Flex, Image, Text, Button, useToast } from "@chakra-ui/react";
import Footer from "components/Footer";
import React, { useState } from "react";
import Header from "../../components/Header/index";
// import ticon from "../../assets/imgs/t.png";
// import borderbl from "../../assets/imgs/borderbl.png";
// import borderbr from "../../assets/imgs/borderbr.png";
// import borderml from "../../assets/imgs/borderml.png";
// import bordermr from "../../assets/imgs/bordermr.png";
// import bordertl from "../../assets/imgs/bordertl.png";
// import bordertr from "../../assets/imgs/bordertr.png";
import {
	borderbl,
	borderbr,
	borderml,
	bordermr,
	bordertl,
	bordertr,
	arrow,
} from "../../constants/cdn.constants";
import styles from "./styles.module.scss";
import { useApi } from "api";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { getSigner } from "contracts";
import { ethers } from "ethers";
import AuthActions from "actions/auth.actions";
// import arrow from "../../assets/imgs/ArrowRight.png";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Email = () => {
	const [saving, setSaving] = useState(false);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const { authToken } = useSelector((state) => state.ConnectWallet);

	const { account, library } = useWeb3React();
	const { getNonce, updateAccountDetails } = useApi();
	const toast = useToast();
	const dispatch = useDispatch();

	const history = useHistory();

	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(["skip-email"]);

	const validEmail = (email) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

	const validateEmail = () => {
		if (email.length === 0 || validEmail(email)) {
			setEmailError(null);
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
		<>
			<Header />
			<Flex
				width={{ base: "90%", lg: "80%" }}
				minHeight={"calc(100vh - 80px)"}
				flexDirection={"column"}
				paddingTop={"85px"}
				margin='auto'
				gridGap={"24px"}
				zIndex='1'
				paddingBottom={"100px"}
				position='relative'>
				<Flex flexDir={"column"} maxWidth='548px' margin={"auto"}>
					<Flex
						position={"relative"}
						width='fit-content'
						padding='10px'
						marginLeft={"auto"}
						marginRight='auto'>
						<Image src={bordertl} position='absolute' top={"0"} left='0' />
						<Image src={borderbl} position='absolute' bottom={"0"} left='0' />
						<Image src={bordertr} position='absolute' top={"0"} right='0' />
						<Image src={borderbr} position='absolute' bottom={"0"} right='0' />
						<Image src={borderml} position='absolute' bottom={"45%"} left='0' />
						<Image
							src={bordermr}
							position='absolute'
							bottom={"45%"}
							right='0'
						/>
						<Text
							fontFamily='Inter'
							fontStyle='normal'
							fontWeight='800'
							fontSize={{ base: "30px", md: "40px" }}
							lineHeight='53px'
							color={"#000"}
							textAlign='center'>
							Welcome to Rhapsody!
						</Text>
					</Flex>
					<Text
						fontFamily='Inter'
						fontStyle='normal'
						fontWeight='600'
						fontSize='16px'
						lineHeight='28px'
						textAlign='center'
						letterSpacing='1px'
						color={"#000"}
						padding='20px'
						paddingTop={"80px"}
						paddingBottom='35px'
						width={"100%"}>
						Enter your Email to be notified of futur drops on the Rhapsody
						plateform
					</Text>
					<input
						className={styles.input}
						maxLength={100}
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={validateEmail}
					/>
					{emailError !== null && <p className={styles.error}>{emailError}</p>}
					<Flex
						border={"1px solid #000"}
						width='calc(100% - 40px)'
						margin={"auto"}>
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
					<Link
						onClick={() => {
							setCookie("skip-email", true, { path: "/", maxAge: 86400 });
							history.replace("/");
						}}>
						<Flex
							flexDir={"row"}
							width='fit-content'
							alignItems={"center"}
							marginLeft='auto'
							justifyContent='center'
							padding={"20px"}>
							<Text
								fontFamily='Inter'
								fontStyle='normal'
								fontWeight='700'
								fontSize='16px'
								lineHeight='20px'
								textAlign='center'>
								Skip
							</Text>
							<Image src={arrow} width='30px' />
						</Flex>
					</Link>
				</Flex>
			</Flex>
			<Footer />
		</>
	);
};

export default Email;
