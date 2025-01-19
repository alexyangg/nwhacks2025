import { Box, Button, Flex, Heading, HStack, Spacer, VStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Landingpage() {
    const navigate = useNavigate();
    return (
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt="20px"
        minH="100vh"
        bg="green.100"
        textAlign="center"
      >
        {/* Title */}
        <Heading
          as="h1"
          fontSize="96px"
          fontWeight="bold"
          fontFamily="Roboto, sans-serif"
          mb={8}
        >
          Welcome to WasteNot
        </Heading>

        {/* Get Started Button */}
        <Button
          colorScheme="teal"
          size="lg"
          px={8}
          py={6}
          fontSize="20px"
          fontWeight="medium"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button >

        {/* Image */}
        <Image
          src="public\img\bgElement.png" // Replace with your image URL
          alt="Placeholder image"
          objectFit="cover"
          objectPosition="top" // Crops from the bottom
        //   w="500px" // Width of the image
          h="300px" // Height of the cropped container
          borderRadius="md"
          boxShadow="lg"
        />
      </Box>
    )
  }
  