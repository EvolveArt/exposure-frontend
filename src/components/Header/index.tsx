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
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import logo from "../../assets/imgs/logo.png";
import wallet from "../../assets/imgs/wallet.png";
import styles from "./styles.module.scss";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"#fff"}
        color={"#000"}
        height={"80px"}
        py={{ base: 2 }}
        px={{ base: "32px" }}
        align={"center"}
        position="fixed"
        width={"100vw"}
      >
        <Flex
          flex={{ base: "unset", md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          width={{ base: "100%", md: "unset" }}
          margin={{ base: "auto", md: "unset" }}
        >
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Image
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              src={logo}
              height={"35px"}
              width={"178px"}
            ></Image>
          </Flex>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            src={logo}
            height={"30px"}
            width={"148px"}
          ></Image>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Flex display={{ base: "none", md: "flex" }}>
            <DesktopNav />
          </Flex>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            fontFamily={"Inter"}
            color={"white"}
            bg={"#000"}
            borderRadius="0px"
            width={"200px"}
            height={"46px"}
            style={{ marginInlineStart: "40px" }}
            _hover={{
              opacity: "0.6",
            }}
          >
            Connect Wallet
            <Image src={wallet} paddingLeft="8px"></Image>
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={"40px"} margin="auto">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            className={styles.link}
            paddingBottom="6px"
            fontFamily={"Inter"}
            fontWeight="600"
            letterSpacing={"1px"}
            fontSize="14px"
            href={navItem.href ?? "#"}
            color={"#000"}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      paddingTop={"83px"}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Button
        fontSize={"sm"}
        fontWeight={600}
        fontFamily={"Inter"}
        color={"white"}
        bg={"#000"}
        borderRadius="0px"
        width={"200px"}
        height={"46px"}
        style={{ marginInlineStart: "0px" }}
        _hover={{
          opacity: "0.6",
        }}
      >
        Connect Wallet
        <Image src={wallet} paddingLeft="8px"></Image>
      </Button>
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
        }}
      >
        <Text
          fontFamily={"Inter"}
          fontWeight="600"
          letterSpacing={"1px"}
          fontSize="14px"
          color={"#000"}
        >
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

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} align={"start"}>
          {children &&
            children.map((child) => (
              <Link
                fontFamily={"Inter"}
                fontWeight="600"
                letterSpacing={"1px"}
                fontSize="14px"
                color={"#000"}
                key={child.label}
                py={2}
                href={child.href}
              >
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
