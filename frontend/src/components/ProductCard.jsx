import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct } = useProductStore();
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
          <IconButton
            aria-label="Edit product"
            icon={<MdEdit size={20} />}
            bg="blue.400"
            _hover={{ bg: "blue.500" }}
            size="sm"
          />
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
