import { Button, Container, Flex, HStack, Text, Link } from "@chakra-ui/react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useColorMode } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
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
          gradientFrom={colorMode === "dark" ? "red.200" : "red.400"}
          gradientTo={colorMode === "dark" ? "blue.200" : "blue.400"}
          bgClip="text"
        >
          <Text>Product Store 🛒</Text>
        </Link>
        <HStack spacing={3} alignItems={"center"}>
          <Link as={RouterLink} to={"/create"}>
            <Button
              colorScheme="teal"
              variant="solid"
              size="md"
              borderRadius="md"
              boxShadow="md"
              _hover={{
                transform: "scale(1.1)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              <Icon as={AiFillPlusSquare} boxSize={5} />
            </Button>
          </Link>

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
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
