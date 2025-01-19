import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // React Router's navigation function

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      setSuccess("Account created successfully! Redirecting to login...");
      setError("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setSuccess("");
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
      <Box w="400px" p="8" bg="white" borderRadius="lg" boxShadow="md">
        {/* Heading */}
        <Heading as="h2" size="lg" textAlign="center" mb="6" color="green.500">
          Create an Account
        </Heading>

        {/* Error Alert */}
        {error && (
          <Alert status="error" mb="4" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert status="success" mb="4" borderRadius="md">
            <AlertIcon />
            {success}
          </Alert>
        )}

        {/* Signup Form */}
        <VStack spacing="4" align="stretch">
          {/* Name Input */}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
              focusBorderColor="teal.500"
            />
          </FormControl>

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

          {/* Confirm Password Input */}
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
              focusBorderColor="teal.500"
            />
          </FormControl>

          {/* Signup Button */}
          <Button
            colorScheme="green"
            size="lg"
            w="100%"
            mt="4"
            onClick={handleSignup}
          >
            Signup
          </Button>
        </VStack>

        {/* Login Link */}
        <Text mt="6" textAlign="center" fontSize="sm">
          Already have an account?{" "}
          <Link color="teal.500" href="/login">
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
