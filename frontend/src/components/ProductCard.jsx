import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success } = await deleteProduct(pid);
    toaster.create({
      description: success
        ? "Product deleted successfully!"
        : "Error deleting product!",
      type: success ? "success" : "error",
      duration: 3000,
      closable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success } = await updateProduct(pid, updatedProduct);
    toaster.create({
      description: success
        ? "Product updated successfully!"
        : "Error updating product!",
      type: success ? "success" : "error",
      duration: 3000,
      closable: true,
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"200px"}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton
                aria-label="Edit product"
                icon={<MdEdit size={20} />}
                bg="blue.400"
                _hover={{ bg: "blue.500" }}
                size="sm"
              />
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Edit Product</Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Header>

                  <Dialog.Body>
                    <Heading as={"h3"} size={"md"} mb={2}>
                      Product Name:
                    </Heading>
                    <Input
                      mb={5}
                      placeholder="Product name"
                      value={updatedProduct.name}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          name: e.target.value,
                        })
                      }
                    />

                    <Heading as={"h3"} size={"md"} mb={2}>
                      Product Price:
                    </Heading>
                    <Input
                      mb={5}
                      placeholder="Product Price"
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        })
                      }
                    />

                    <Heading as={"h3"} size={"md"} mb={2}>
                      Product Image:
                    </Heading>
                    <Input
                      mb={5}
                      placeholder="Product Image URL"
                      value={updatedProduct.image}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        })
                      }
                    />
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.CloseTrigger>

                    <Dialog.CloseTrigger asChild>
                      <Button
                        bgColor={useColorModeValue("blue.400", "blue.600")}
                        _hover={{
                          bgColor: useColorModeValue("blue.500", "blue.700"),
                        }}
                        onClick={() =>
                          handleUpdateProduct(product._id, updatedProduct)
                        }
                      >
                        Save
                      </Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <IconButton
            aria-label="Delete product"
            onClick={() => handleDeleteProduct(product._id)}
            icon={<MdDelete />}
            bg="red.400"
            _hover={{ bg: "red.500" }}
            size="sm"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
