import { Container, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { Toaster } from "../components/ui/toaster";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"6xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient="to-r"
          gradientFrom={colorMode === "dark" ? "red.200" : "red.400"}
          gradientTo={colorMode === "dark" ? "blue.200" : "blue.400"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🛒
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={"10px"}
          w={"full"}
          minChildWidth="250px"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color="gray.500"
          >
            No products found :/
            <Link as={RouterLink} to={"/create"}>
              <Text
                marginStart={"15px"}
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
      <Toaster/>
    </Container>
  );
};

export default HomePage;
