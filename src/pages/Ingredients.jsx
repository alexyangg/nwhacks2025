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
  Input,
  Image,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const ingredients = useLoaderData();
  const navigate = useNavigate();

  const hasIngredients = ingredients && ingredients.length > 0;

  return (
    <Box>
      <Heading mb="20px" textAlign="center">
        Your Ingredients
      </Heading>

      {!hasIngredients ? (
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
  );
}
