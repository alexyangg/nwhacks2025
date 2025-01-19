import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Text, VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // React Router's navigation function

  const handleLogin = () => {
    // Replace with actual authentication
    const correctEmail = "test@example.com";
    const correctPassword = "password123";

    if (email === correctEmail && password === correctPassword) {
      // Navigate to dashboard if credentials are correct
      navigate("/dashboard/ingredients");
    } else {
      // Set an error message if credentials are incorrect
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.100"
    >
      <Box
        w="400px"
        p="8"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
      >
        {/* Heading */}
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          mb="6"
          color="green.500"
        >
          Welcome Back
        </Heading>

        {/* Error Alert */}
        {error && (
          <Alert status="error" mb="4" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <VStack spacing="4" align="stretch">
          {/* Email Input */}
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              focusBorderColor="teal.500"
            />
          </FormControl>

          {/* Password Input */}
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              focusBorderColor="teal.500"
            />
          </FormControl>

          {/* Forgot Password */}
          <Box textAlign="right">
            <Link color="teal.500" fontSize="sm">
              Forgot Password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            colorScheme="green"
            size="lg"
            w="100%"
            mt="4"
            onClick={handleLogin}
          >
            Login
          </Button>
        </VStack>

        {/* Sign Up Link */}
        <Text mt="6" textAlign="center" fontSize="sm">
          Don't have an account?{" "}
          <Link color="teal.500" href="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
