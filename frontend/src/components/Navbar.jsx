import { Button, Container, Flex, HStack, Text, Link } from "@chakra-ui/react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink
import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from "./ui/color-mode";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Link
          as={RouterLink}
          to={"/"}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="red.200"
          gradientTo="blue.200"
          bgClip="text"
        >
          <Text>Product Store 🛒</Text>
        </Link>
        <HStack spacing={3} alignItems={"center"}>
  {/* Butonul cu iconiță */}
  <Link as={RouterLink} to={"/create"}>
    <Button
      colorScheme="teal"       // Culoarea principală
      variant="solid"           // Stil solid
      size="md"                 // Dimensiune medie
      borderRadius="md"         // Colțuri rotunjite
      boxShadow="md"            // Shadow subtil
      _hover={{                 // Efect la hover
        transform: "scale(1.1)",
        boxShadow: "lg",
      }}
      transition="all 0.2s"
    >
      <Icon as={AiFillPlusSquare} boxSize={5} />
    </Button>
  </Link>

  {/* Butonul Dark/Light Mode */}
  <Button
    colorScheme={colorMode === "light" ? "purple" : "yellow"}
    variant="outline"
    size="md"
    borderRadius="full"
    _hover={{
      bg: colorMode === "light" ? "purple.100" : "yellow.300",
      transform: "scale(1.1)",
    }}
    transition="all 0.2s"
    onClick={toggleColorMode}
  >
    {colorMode === "light" ? "🌛" : "🌞"}
  </Button>
</HStack>

      </Flex>
    </Container>
  );
};

export default Navbar;
