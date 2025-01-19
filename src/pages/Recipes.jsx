import { useState } from 'react';
import { Box, Card, CardBody, Flex, SimpleGrid, Text, Heading, VStack, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from '@chakra-ui/react';

export default function Recipes() {
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card for the modal
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the clicked state
  };

  const handleCardClick = (index) => {
    setSelectedCard(index); // Set the selected card
    setIsOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsOpen(false); // Close the modal
    setSelectedCard(null); // Reset selected card
  };

  return (
    <Box>
      <Heading mb="20px" textAlign="center">Yummy Recipes!!</Heading>
      <SimpleGrid spacing="10px">
        {[1].map((ingredient, index) => ( // Use actual data here
          <Card
            key={index}
            borderTop="8px"
            borderColor="green.400"
            bg="green.200"
            p={4}
            borderRadius="md"
            height="100%"
            spacing="10px"
            w="100%"
            onClick={() => handleCardClick(index)} // Open modal on card click
            cursor="pointer"
            boxShadow="none"
            _hover={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }} // Add hover effect
          >
            <Flex h="100%" align="center" gap={4}>
              {/* Image Box */}
              <Box bgColor="gray.200" flexShrink={0} width="120px" height="120px" borderRadius="md">
                <Image
                  src=""
                  fallbackSrc="/img/stir-fried-tomato-and-egg.jpg"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  borderRadius="md"
                />
              </Box>

              {/* Content Box */}
              <Box flex="1" borderRadius="md">
                <VStack align="start" spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold">
                     Egg and Tomato Stir Fry {/* Replace with dynamic data */}
                  </Text>
                  <Text fontSize="md">
                    This is the description text that explains the title or the image. It will automatically take the remaining
                    space on the right.
                  </Text>
                </VStack>
              </Box>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal for showing details */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recipe Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xl" fontWeight="bold">
              Title {selectedCard + 1} {/* Dynamic content based on selected card */}
            </Text>
            <Text mt={4}>
              This is where you can add detailed information about the recipe, such as ingredients, preparation steps, and any other relevant details.
            </Text>
            {/* You can add more content such as images, videos, or steps here */}
            <Flex justify="space-between" width="100%">
                <Button mt={4} colorScheme="green"  onClick={closeModal}>
                    Close
                </Button>
                <Button mt={4} colorScheme={isClicked ? 'orange' : 'green'} onClick={handleClick}>
                    Save
                </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
        </Modal>
        <Button 
        colorScheme='orange' 
        margin="10px"
        >
            Regenerate
        </Button>
    </Box>
  );
}

export const tasksLoader = async () => {
  const res = await fetch('http://localhost:3000/tasks');
  return res.json();
};
