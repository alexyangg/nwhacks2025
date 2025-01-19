import { AddIcon, EditIcon, MinusIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  SimpleGrid,
  Text,
  Heading,
  HStack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const ingredients = useLoaderData();
  const navigate = useNavigate();

  const hasIngredients = ingredients && ingredients.length > 0;

  return (
    <Box>
      <Heading mb="20px" textAlign="center">
        Your Ingredients
      </Heading>

      {!ingredients || ingredients.length === 0 ? (
        <Box textAlign="center">
          <Text mb="4">No ingredients added yet.</Text>
          <Button
            colorScheme="green"
            onClick={() => navigate("/dashboard/create")}
          >
            Add Your First Ingredient
          </Button>
        </Box>
      ) : (
        <SimpleGrid spacing="10px" minChildWidth="300px">
          {ingredients.map((ingredient) => (
            <Card
              key={ingredient._id}
              borderTop="8px"
              borderColor="green.400"
              bg="white"
            >
              <CardHeader>
                <Box bgColor="green.200" maxH="180px" overflow="hidden">
                  {ingredient.image && (
                    <Image
                      src={ingredient.image}
                      alt={ingredient.name}
                      objectFit="cover"
                      objectPosition="center"
                      w="100%"
                      h="100%"
                    />
                  )}
                </Box>
              </CardHeader>

              <CardBody color="gray.500">
                <Flex gap={5}>
                  <Box w="100%">
                    <Heading as="h3" size="sm" mb="2">
                      {ingredient.name}
                    </Heading>
                    <Text>Quantity: {ingredient.quantity}</Text>
                    <Text>
                      Expires:{" "}
                      {new Date(ingredient.expiryDate).toLocaleDateString()}
                    </Text>
                  </Box>
                </Flex>
              </CardBody>

              <Divider borderColor="gray.200" />

              <CardFooter>
                <HStack spacing="4" width="100%" justify="space-between">
                  <Button variant="ghost" leftIcon={<AddIcon />}>
                    Add
                  </Button>
                  <Input
                    type="number"
                    name="quantity"
                    placeholder={String(ingredient.quantity)}
                    textAlign="center"
                    width="100px"
                  />
                  <Button variant="ghost" leftIcon={<MinusIcon />}>
                    Remove
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Always visible Add button */}
      <Button
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="green"
        onClick={() => navigate("/dashboard/create")}
        leftIcon={<AddIcon />}
      >
        Add Ingredient
      </Button>
    </Box>

    // <Box>
    //   <Heading mb="20px" textAlign="center">
    //     Your Ingredients
    //   </Heading>

    //   {/* Display "Add Ingredient" button if no ingredients are available */}
    //   {!hasIngredients && (
    //     <Button
    //       colorScheme="green"
    //       onClick={() => navigate("/dashboard/create")}
    //       mb="20px"
    //     >
    //       Add Ingredient
    //     </Button>
    //   )}

    //   <SimpleGrid spacing="10px" minChildWidth="300px">
    //     {hasIngredients &&
    //       ingredients.map((ingredient) => (
    //         <Card
    //           key={ingredient.id}
    //           borderTop="8px"
    //           borderColor="green.400"
    //           bg="white"
    //         >
    //           <CardHeader>
    //             <Box bgColor="green.200" maxH="180px" overflow="hidden">
    //               <Image
    //                 src={ingredient.img} // Replace with your image URL
    //                 alt={ingredient.title}
    //                 objectFit="cover"
    //                 objectPosition="center"
    //                 w="100%"
    //                 h="100%"
    //               />
    //             </Box>
    //           </CardHeader>

    //           <CardBody color="gray.500">
    //             <Flex gap={5}>
    //               <Box>
    //                 <Heading as="h3" size="sm">
    //                   {ingredient.title}
    //                 </Heading>
    //                 {/* <Heading as="h3" size="sm">
    //                   {ingredient.description}
    //                 </Heading> */}
    //                 {/* <Text>by {ingredient.author}</Text> */}
    //               </Box>
    //             </Flex>
    //             {/* <Text>{ingredient.description}</Text> */}
    //           </CardBody>

    //           <Divider borderColor="gray.200" />

    //           <CardFooter>
    //             <HStack>
    //               <Button variant={"ghost"} leftIcon={<AddIcon />}>
    //                 Add
    //               </Button>
    //               <Form>
    //                 <FormControl>
    //                   {/* <FormLabel>Edit Amount</FormLabel> */}
    //                   <Input
    //                     type="text"
    //                     name="title"
    //                     placeHolder={ingredient.quantity}
    //                     textAlign="center"
    //                   />
    //                 </FormControl>
    //               </Form>

    //               <Button variant={"ghost"} leftIcon={<MinusIcon />}>
    //                 Remove
    //               </Button>
    //             </HStack>
    //           </CardFooter>
    //         </Card>
    //       ))}
    //   </SimpleGrid>
    // </Box>
  );
}

export const tasksLoader = async () => {
  // const res = await fetch("http://localhost:3000/tasks");

  try {
    const token = localStorage.getItem("authToken");

    const res = await fetch("http://localhost:5000/api/ingredients", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ingredients: ${res.statusText}`);
    }
    const ingredients = await res.json();
    console.log("Received data:", ingredients);
    return ingredients;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
