import { AddIcon, MinusIcon } from "@chakra-ui/icons";
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
  Image,
  Alert,
  AlertIcon,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const ingredients = useLoaderData();
  const navigate = useNavigate();

// Helper function to check expiry
const isExpiryClose = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = diffTime / (1000 * 3600 * 24);
  return diffDays; // Return the difference in days
};

// Helper function to generate expiry message
const expiryMsg = (diffDays) => {
  let msg = "";
  if (diffDays <1) {
    msg = "This ingredient is expired";
  } else if (diffDays <= 3) {
    msg = "This ingredient is about to expire in 3 days or less!";
  }else {
    msg = ""
  }
  return msg;
};

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
                <Image src={ingredient.image} />
              </CardHeader>

              <CardBody color="gray.500">
                  <Box w="100%">
                  <VStack gap={5} flexDir={'row'}>
                    <Heading as="h3" size="sm" mb="2">
                      {ingredient.name}
                    </Heading>
                    <Box>
                      <Text>Quantity: {ingredient.quantity}</Text>
                      <Text>
                        Expires:{" "}
                        {new Date(ingredient.expiryDate).toLocaleDateString()}
                      </Text>
                    </Box>
                  </VStack>
                      {isExpiryClose(ingredient.expiryDate) <=3 && (
                        <Alert status="warning" mt="4">
                          <AlertIcon />
                          {expiryMsg(isExpiryClose(ingredient.expiryDate))}
                        </Alert>
                      )}
                  </Box>
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
  );
}

export const tasksLoader = async () => {
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
