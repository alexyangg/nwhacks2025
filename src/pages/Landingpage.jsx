import { Box, Button, VStack } from '@chakra-ui/react';
import { Component } from 'react';

export default function Landingpage() {
    return (
        <Box>
            <VStack spacing={5}>
                <Button color="white" bg="green.400">Login</Button>
                <Button color="white" bg="green.400">Sign up</Button>
            </VStack>
        </Box>
    )
  }
  