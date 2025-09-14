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
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        description: "Error deleting product!",
        type: "error",
        duration: 3000,
        closable: true,
      });
    } else
      toaster.create({
        description: "Product deleted succesfully!",
        type: "success",
        duration: 3000,
        closable: true,
      });
  };
  const { updateProduct } = useProductStore();
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toaster.create({
        description: "Error updating product!",
        type: "error",
        duration: 3000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product updated succesfully!",
        type: "success",
        duration: 3000,
        closable: true,
      });
      setIsOpen(false);
    }
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
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
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
                  </Dialog.Header>
                  <Dialog.Body>
                    <Heading as={"h3"} size={"md"} mb={2}>
                      Product Name:
                    </Heading>
                    <Input
                      mb={5}
                      placeholder="Product name"
                      name="name"
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
                      name="price"
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        })
                      }
                      value={updatedProduct.price}
                    />
                    <Heading as={"h3"} size={"md"} mb={2}>
                      Product Image:
                    </Heading>
                    <Input
                      mb={5}
                      placeholder="Product Image URL"
                      name="image"
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
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
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
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
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
