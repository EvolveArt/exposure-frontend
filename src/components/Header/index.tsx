import React from "react";
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Image,
	Skeleton,
} from "@chakra-ui/react";

import cx from "classnames";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../../assets/imgs/logo.png";
import wallet from "../../assets/imgs/wallet.png";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalActions from "actions/modal.actions";
import ConnectWalletModal from "components/ConnectWalletModal";
// eslint-disable-next-line
import { RootState } from "stores/reduxStore";
import { useEffect, useState } from "react";
import { useApi } from "api";
import WalletConnectActions from "actions/walletconnect.actions";
import AuthActions from "actions/auth.actions";
import { useWeb3React } from "@web3-react/core";
import { NETWORK_LABEL } from "constants/networks";
import { shortenAddress } from "utils";
import down from "../../assets/imgs/down.png";
import disc from "../../assets/imgs/disconnect.png";
import profile from "../../assets/imgs/account.png";
// import Identicon from "components/Identicon";

export default function Header() {
	const { account, chainId, deactivate } = useWeb3React();

	const { isOpen, onToggle } = useDisclosure();
	const dispatch = useDispatch();

	const { getAuthToken, getAccountDetails } = useApi();

	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleConnectWallet = () => {
		dispatch(ModalActions.showConnectWalletModal());
	};

	const { connectWalletModalVisible } = useSelector(
		(state: RootState) => state.Modal
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const isMenuOpen = Boolean(anchorEl);

	const login = async () => {
		try {
			setLoading(true);
			const token = await getAuthToken(account);
			// const isModerator = await getIsModerator(account);

			dispatch(WalletConnectActions.connectWallet(token, false));
			dispatch(AuthActions.fetchStart());
			try {
				const { data } = await getAccountDetails(token);
				dispatch(AuthActions.fetchSuccess(data));
			} catch {
				dispatch(AuthActions.fetchFailed());
			}
			setLoading(false);
		} catch {
			setLoading(false);
		}
	};

	const init = () => {
		login();
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleSignOut = () => {
		deactivate();
		dispatch(WalletConnectActions.disconnectWallet());
		dispatch(AuthActions.signOut());
		handleMenuClose();
	};

	useEffect(() => {
		if (account) {
			init();
		} else {
			handleSignOut();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, chainId]);

	return (
		<Box>
			<Flex
				bg={"#fff"}
				color={"#000"}
				height={"80px"}
				py={{ base: 2 }}
				px={{ base: "32px" }}
				align={"center"}
				position='fixed'
				width={"100vw"}
				zIndex='3'>
				<Flex
					flex={{ base: "unset", md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
					width={{ base: "100%", md: "unset" }}
					margin={{ base: "auto", md: "unset" }}>
					<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
						<Link href='/#'>
							<Image
								textAlign={useBreakpointValue({ base: "center", md: "left" })}
								fontFamily={"heading"}
								color={useColorModeValue("gray.800", "white")}
								src={logo}></Image>
						</Link>
					</Flex>
					<IconButton
						onClick={onToggle}
						margin='auto'
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
					<Link href='/#'>
						<Image
							textAlign={useBreakpointValue({ base: "center", md: "left" })}
							fontFamily={"heading"}
							color={useColorModeValue("gray.800", "white")}
							src={logo}></Image>
					</Link>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}>
					<Flex display={{ base: "none", md: "flex" }}>
						<DesktopNav />
						{account ? (
							<div
								className={cx(styles.account, styles.menuUser)}
								onClick={onToggle}>
								<div className={styles.profile}>
									<div
										className={styles.address}
										data-title={shortenAddress(account)}>
										{loading ? (
											<Skeleton width={60} style={{ background: "black" }} />
										) : (
											shortenAddress(account)
										)}
									</div>
									<div className={styles.network}>
										{loading ? (
											<Skeleton width={60} style={{ background: "black" }} />
										) : (
											NETWORK_LABEL[chainId || 1]
										)}
									</div>
								</div>
								<Image src={down} marginLeft='auto' />
								<Collapse in={isOpen} animateOpacity>
									<Box
										color='#000'
										width={"200px"}
										mt='4'
										bg='#fff'
										border='2px solid #000'
										shadow='md'
										position='absolute'
										right={"32px"}
										top='53px'
										zIndex={"100"}>
										<div
											className={styles.dropElt}
											style={{ borderBottom: "1px solid #bbb" }}>
											<Image src={profile} paddingRight='15px' />
											My account
										</div>
										<div className={styles.dropElt} onClick={deactivate}>
											<Image src={disc} paddingRight='15px' />
											Disconnect
										</div>
									</Box>
								</Collapse>
							</div>
						) : (
							<Button
								display={{ base: "none", md: "inline-flex" }}
								fontSize={"sm"}
								fontWeight={600}
								fontFamily={"Inter"}
								color={"white"}
								bg={"#000"}
								borderRadius='0px'
								width={"200px"}
								height={"46px"}
								style={{ marginInlineStart: "40px" }}
								_hover={{
									opacity: "0.6",
								}}
								onClick={handleConnectWallet}>
								Connect Wallet
								<Image src={wallet} paddingLeft='8px'></Image>
							</Button>
						)}
					</Flex>
				</Stack>
			</Flex>

			<Collapse
				style={{
					marginTop: "0!important",
					position: "fixed",
					zIndex: "2",
					width: "100vw",
					height: "100vh!important",
				}}
				in={isOpen}
				animateOpacity>
				<MobileNav />
			</Collapse>

			<ConnectWalletModal
				visible={connectWalletModalVisible}
				onClose={() => dispatch(ModalActions.hideConnectWalletModal())}
			/>
		</Box>
	);
}

const DesktopNav = () => {
	const linkHoverColor = useColorModeValue("gray.800", "white");

	return (
		<Stack direction={"row"} spacing={"40px"} margin='auto'>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Link
						className={styles.link}
						paddingBottom='6px'
						fontFamily={"Inter"}
						fontWeight='600'
						letterSpacing={"1px"}
						fontSize='14px'
						href={navItem.href ?? "#"}
						color={"#000"}
						_hover={{
							textDecoration: "none",
							color: linkHoverColor,
						}}>
						{navItem.label}
					</Link>
				</Box>
			))}
		</Stack>
	);
};

const MobileNav = () => {
	const { account, chainId, deactivate } = useWeb3React();

	const { isOpen, onToggle } = useDisclosure();
	const dispatch = useDispatch();

	const { getAuthToken, getAccountDetails } = useApi();

	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleConnectWallet = () => {
		dispatch(ModalActions.showConnectWalletModal());
	};

	// const { connectWalletModalVisible } = useSelector(
	// 	(state: RootState) => state.Modal
	// );

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const isMenuOpen = Boolean(anchorEl);

	const login = async () => {
		try {
			setLoading(true);
			const token = await getAuthToken(account);
			// const isModerator = await getIsModerator(account);

			dispatch(WalletConnectActions.connectWallet(token, false));
			dispatch(AuthActions.fetchStart());
			try {
				const { data } = await getAccountDetails(token);
				dispatch(AuthActions.fetchSuccess(data));
			} catch {
				dispatch(AuthActions.fetchFailed());
			}
			setLoading(false);
		} catch {
			setLoading(false);
		}
	};

	const init = () => {
		login();
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleSignOut = () => {
		deactivate();
		dispatch(WalletConnectActions.disconnectWallet());
		dispatch(AuthActions.signOut());
		handleMenuClose();
	};

	useEffect(() => {
		if (account) {
			init();
		} else {
			handleSignOut();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, chainId]);

	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}
			paddingTop={"83px"}
			height='100vh'>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
			{account ? (
				<div className={cx(styles.account, styles.menuUser)} onClick={onToggle}>
					<div className={styles.profile}>
						<div
							className={styles.address}
							data-title={shortenAddress(account)}>
							{loading ? (
								<Skeleton width={60} style={{ background: "black" }} />
							) : (
								shortenAddress(account)
							)}
						</div>
						<div className={styles.network}>
							{loading ? (
								<Skeleton width={60} style={{ background: "black" }} />
							) : (
								NETWORK_LABEL[chainId || 1]
							)}
						</div>
					</div>
					<Image src={down} marginLeft='auto' />
					<Collapse in={isOpen} animateOpacity>
						<Box
							color='#000'
							width={"200px"}
							mt='4'
							bg='#fff'
							border='2px solid #000'
							shadow='md'
							position='absolute'
							left={"16px"}
							top='300px'
							zIndex={"100"}>
							<div className={styles.dropElt}>
								<Image src={profile} paddingRight='15px' />
								My account
							</div>
							<div className={styles.dropElt} onClick={deactivate}>
								<Image src={disc} paddingRight='15px' />
								Disconnect
							</div>
						</Box>
					</Collapse>
				</div>
			) : (
				<Button
					display={{ base: "none", md: "inline-flex" }}
					fontSize={"sm"}
					fontWeight={600}
					fontFamily={"Inter"}
					color={"white"}
					bg={"#000"}
					borderRadius='0px'
					width={"200px"}
					height={"46px"}
					style={{ marginInlineStart: "40px" }}
					_hover={{
						opacity: "0.6",
					}}
					onClick={handleConnectWallet}>
					Connect Wallet
					<Image src={wallet} paddingLeft='8px'></Image>
				</Button>
			)}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text
					fontFamily={"Inter"}
					fontWeight='600'
					letterSpacing={"1px"}
					fontSize='14px'
					color={"#000"}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse
				in={isOpen}
				animateOpacity
				style={{
					marginTop: "0!important",
				}}>
				<Stack mt={2} pl={4} align={"start"}>
					{children &&
						children.map((child) => (
							<Link
								fontFamily={"Inter"}
								fontWeight='600'
								letterSpacing={"1px"}
								fontSize='14px'
								color={"#000"}
								key={child.label}
								py={2}
								href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: "Artists",
		href: "#",
	},
	{
		label: "Collections",
		href: "#",
	},
	{
		label: "Q&A",
		href: "#",
	},
	{
		label: "Search",
		href: "#",
	},
];
