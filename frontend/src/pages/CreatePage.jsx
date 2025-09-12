import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster, Toaster } from "../components/ui/toaster";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        description: "Error creating product!",
        type: "error",
        duration: 3000,
        closable: true,
      });
    } else {
      toaster.create({
        description: "Product created succesfully!",
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        {/* or p, h2, h3, etc */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />

            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button bg={"purple.400"} onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  );
};

export default CreatePage;
