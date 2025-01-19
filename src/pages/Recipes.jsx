// // import { useState } from 'react';
// // import { Box, Card, CardBody, Flex, SimpleGrid, Text, Heading, VStack, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from '@chakra-ui/react';

// // export default function Recipes() {
// //   const [selectedCard, setSelectedCard] = useState(null); // Track the selected card for the modal
// //   const [isOpen, setIsOpen] = useState(false); // Modal open/close state
// //   const [isClicked, setIsClicked] = useState(false);

// //   const handleClick = () => {
// //     setIsClicked(!isClicked); // Toggle the clicked state
// //   };

// //   const handleCardClick = (index) => {
// //     setSelectedCard(index); // Set the selected card
// //     setIsOpen(true); // Open the modal
// //   };

// //   const closeModal = () => {
// //     setIsOpen(false); // Close the modal
// //     setSelectedCard(null); // Reset selected card
// //   };

// //   return (
// //     <Box>
// //       <Heading mb="20px" textAlign="center">Yummy Recipes!!</Heading>
// //       <SimpleGrid spacing="10px">
// //         {[1, 2].map((ingredient, index) => ( // Use actual data here
// //           <Card
// //             key={index}
// //             borderTop="8px"
// //             borderColor="green.400"
// //             bg="green.200"
// //             p={4}
// //             borderRadius="md"
// //             height="100%"
// //             spacing="10px"
// //             w="100%"
// //             onClick={() => handleCardClick(index)} // Open modal on card click
// //             cursor="pointer"
// //             boxShadow="none"
// //             _hover={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }} // Add hover effect
// //           >
// //             <Flex h="100%" align="center" gap={4}>
// //               {/* Image Box */}
// //               <Box bgColor="gray.200" flexShrink={0} width="120px" height="120px" borderRadius="md">
// //                 <Image
// //                   src=""
// //                   fallbackSrc="/public/img/placeholder.jpg"
// //                   objectFit="cover"
// //                   width="100%"
// //                   height="100%"
// //                   borderRadius="md"
// //                 />
// //               </Box>

// //               {/* Content Box */}
// //               <Box flex="1" borderRadius="md">
// //                 <VStack align="start" spacing={2}>
// //                   <Text fontSize="2xl" fontWeight="bold">
// //                     Title {index + 1} {/* Replace with dynamic data */}
// //                   </Text>
// //                   <Text fontSize="md">
// //                     This is the description text that explains the title or the image. It will automatically take the remaining
// //                     space on the right.
// //                   </Text>
// //                 </VStack>
// //               </Box>
// //             </Flex>
// //           </Card>
// //         ))}
// //       </SimpleGrid>

// //       {/* Modal for showing details */}
// //       <Modal isOpen={isOpen} onClose={closeModal}>
// //         <ModalOverlay />
// //         <ModalContent>
// //           <ModalHeader>Recipe Details</ModalHeader>
// //           <ModalCloseButton />
// //           <ModalBody>
// //             <Text fontSize="xl" fontWeight="bold">
// //               Title {selectedCard + 1} {/* Dynamic content based on selected card */}
// //             </Text>
// //             <Text mt={4}>
// //               This is where you can add detailed information about the recipe, such as ingredients, preparation steps, and any other relevant details.
// //             </Text>
// //             {/* You can add more content such as images, videos, or steps here */}
// //             <Flex justify="space-between" width="100%">
// //                 <Button mt={4} colorScheme="green"  onClick={closeModal}>
// //                     Close
// //                 </Button>
// //                 <Button mt={4} colorScheme={isClicked ? 'orange' : 'green'} onClick={handleClick}>
// //                     Save
// //                 </Button>
// //             </Flex>
// //           </ModalBody>
// //         </ModalContent>
// //         </Modal>
// //         <Button
// //         colorScheme='orange'
// //         margin="10px"
// //         >
// //             Regenerate
// //         </Button>
// //     </Box>
// //   );
// // }

// // export const tasksLoader = async () => {
// //   const res = await fetch('http://localhost:3000/tasks');
// //   return res.json();
// // };

// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Checkbox,
//   CheckboxGroup,
//   Text,
//   VStack,
//   HStack,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function CreateRecipe() {
//   const [ingredients, setIngredients] = useState([]); // To store the list of ingredients from the backend
//   const [selectedIngredients, setSelectedIngredients] = useState([]); // To store selected ingredients
//   const [spoonacularApiKey] = useState("your-spoonacular-api-key"); // Store Spoonacular API key securely, e.g., from environment variables
//   const [recipes, setRecipes] = useState([]); // To store the generated recipes
//   const [loading, setLoading] = useState(false); // To manage loading state

//   useEffect(() => {
//     // Get the ingredients from the user's account (assuming it's an API endpoint)
//     const fetchIngredients = async () => {
//       const token = localStorage.getItem("authToken");
//       if (token) {
//         try {
//           const response = await axios.get(
//             "http://localhost:5000/api/ingredients",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setIngredients(response.data); // Populate the ingredients list
//         } catch (error) {
//           console.error("Error fetching ingredients:", error);
//         }
//       }
//     };

//     fetchIngredients();
//   }, []);

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.error("No authorization token found");
//       return;
//     }

//     setLoading(true); // Set loading to true when fetching recipes
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/recipes/recommend", // Backend API
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token for authorization
//           },
//           params: {
//             ingredients: selectedIngredients.join(","),
//           },
//         }
//       );
//       setRecipes(response.data); // Store the fetched recipes
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error(
//         "Error generating recipe:",
//         error.response ? error.response.data : error.message
//       );
//       setLoading(false); // Stop loading on error
//     }
//   };

//   return (
//     <Box>
//       <FormControl>
//         <FormLabel>Select Ingredients for Recipe</FormLabel>
//         <CheckboxGroup
//           value={selectedIngredients}
//           onChange={(values) => setSelectedIngredients(values)}
//         >
//           {ingredients.map((ingredient) => (
//             <Checkbox key={ingredient._id} value={ingredient._id}>
//               {ingredient.name}
//             </Checkbox>
//           ))}
//         </CheckboxGroup>
//       </FormControl>

//       <Button onClick={handleSubmit} isLoading={loading}>
//         Generate Recipe
//       </Button>

//       {loading && <Text mt={4}>Loading recipes...</Text>}

//       {/* Display generated recipes */}
//       {recipes.length > 0 && !loading && (
//         <VStack spacing={4} mt={8}>
//           <Text fontSize="2xl" fontWeight="bold">
//             Recommended Recipes:
//           </Text>
//           <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
//             {recipes.map((recipe) => (
//               <Box
//                 key={recipe.recipeId}
//                 borderWidth="1px"
//                 borderRadius="md"
//                 p={4}
//               >
//                 <Text fontSize="xl" fontWeight="semibold">
//                   {recipe.title}
//                 </Text>
//                 <Text mt={2}>Recipe ID: {recipe.recipeId}</Text>
//                 {/* Add other details of the recipe if available */}
//                 {/* Example: <Text mt={2}>Cooking Time: {recipe.time} minutes</Text> */}
//               </Box>
//             ))}
//           </SimpleGrid>
//         </VStack>
//       )}

//       {recipes.length === 0 && !loading && (
//         <Text mt={4}>No recipes found. Please select ingredients.</Text>
//       )}
//     </Box>
//   );
// }

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState([]); // To store the list of ingredients from the backend
  const [selectedIngredients, setSelectedIngredients] = useState([]); // To store selected ingredients
  const [spoonacularApiKey] = useState("your-spoonacular-api-key"); // Store Spoonacular API key securely, e.g., from environment variables
  const [recipes, setRecipes] = useState([]); // To store the generated recipes
  const [loading, setLoading] = useState(false); // To manage loading state
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal for save confirmation

  useEffect(() => {
    // Get the ingredients from the user's account (assuming it's an API endpoint)
    const fetchIngredients = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/ingredients",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIngredients(response.data); // Populate the ingredients list
        } catch (error) {
          console.error("Error fetching ingredients:", error);
        }
      }
    };

    fetchIngredients();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authorization token found");
      return;
    }

    setLoading(true); // Set loading to true when fetching recipes
    try {
      const response = await axios.get(
        "http://localhost:5000/api/recipes/recommend", // Backend API
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authorization
          },
          params: {
            ingredients: selectedIngredients.join(","),
          },
        }
      );
      setRecipes(response.data); // Store the fetched recipes
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(
        "Error generating recipe:",
        error.response ? error.response.data : error.message
      );
      setLoading(false); // Stop loading on error
    }
  };

  // const handleSave = async () => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     console.error("No authorization token found");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/ingredients/add",
  //       // { ingredients: selectedIngredients },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Pass the token for authorization
  //         },
  //       }
  //     );
  //     console.log("Ingredients saved successfully:", response.data);
  //     onClose(); // Close modal after saving
  //   } catch (error) {
  //     console.error("Error saving ingredients:", error);
  //   }
  // };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authorization token found");
      return;
    }

    const recipeData = {
      // Replace with the actual recipe data you want to save
      title: "Recipe Title",
      ingredients: selectedIngredients, // Assuming you have ingredients as part of your recipe
      instructions: "Step-by-step instructions...",
      // Add other fields as needed, such as image, prep time, etc.
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipes/save", // Update the endpoint
        // recipeData, // Pass the recipe data in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authorization
          },
        }
      );
      console.log("Recipe saved successfully:", response.data);
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Select Ingredients for Recipe</FormLabel>
        <CheckboxGroup
          value={selectedIngredients}
          onChange={(values) => setSelectedIngredients(values)}
        >
          {ingredients.map((ingredient) => (
            <Checkbox key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </FormControl>

      <Button onClick={handleSubmit} isLoading={loading} colorScheme="teal">
        Generate Recipe
      </Button>

      {loading && <Text mt={4}>Loading recipes...</Text>}

      {/* Display generated recipes */}
      {recipes.length > 0 && !loading && (
        <VStack spacing={4} mt={8}>
          <Text fontSize="2xl" fontWeight="bold">
            Recommended Recipes:
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {recipes.map((recipe) => (
              <Box
                key={recipe.recipeId}
                borderWidth="1px"
                borderRadius="md"
                p={4}
              >
                <Text fontSize="xl" fontWeight="semibold">
                  {recipe.title}
                </Text>
                <Text mt={2}>Recipe ID: {recipe.recipeId}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      )}

      {recipes.length === 0 && !loading && (
        <Text mt={4}>No recipes found. Please select ingredients.</Text>
      )}

      {/* Save Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Ingredients</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to save these ingredients for later use?
            </Text>
            <HStack mt={4}>
              <Button colorScheme="green" onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Button to trigger Save Modal */}
      <Button
        colorScheme="blue"
        onClick={onOpen}
        mt={4}
        disabled={selectedIngredients.length === 0}
      >
        Save Selected Ingredients
      </Button>
    </Box>
  );
}
