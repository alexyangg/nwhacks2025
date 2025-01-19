// import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { Form } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Create() {
  const [ingredientData, setIngredientData] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    image: "",
  });

  // const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setIngredientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authorization token found");
      return;
    }

    const formattedData = {
      name: ingredientData.name,
      quantity: Number(ingredientData.quantity),
      expiryDate: new Date(ingredientData.expiryDate),
      image: ingredientData.image,
    };

    console.log("Formatted data to send:", formattedData);

    try {
      console.log("before create");
      const response = await axios.post(
        "http://localhost:5000/api/ingredients/add",
        ingredientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Ingredient created successfully:", response.data);
    } catch (error) {
      console.error("Error creating ingredient:", error.message);
    }
  };

  return (
    <Box p="8" bg="white" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing="4" align="stretch">
          {/* Ingredient Name */}
          <FormControl isRequired>
            <FormLabel>Ingredient Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={ingredientData.name}
              onChange={handleInputChange}
              textAlign="left"
              placeholder="Enter ingredient name"
            />
          </FormControl>

          {/* Quantity */}
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              name="quantity"
              value={ingredientData.quantity}
              onChange={handleInputChange}
              textAlign="left"
              placeholder="Enter quantity"
            />
          </FormControl>

          {/* Expiry Date */}
          <FormControl isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="text"
              name="expiryDate"
              value={ingredientData.expiryDate}
              onChange={handleInputChange}
              textAlign="left"
              placeholder="Enter expiry date"
            />
          </FormControl>

          {/* Image URL */}
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              name="image"
              value={ingredientData.image}
              onChange={handleInputChange}
              textAlign="left"
              placeholder="Enter image URL"
            />
          </FormControl>

          {/* Submit Button */}
          <Button colorScheme="green" type="submit" w="100%">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>

    // <Box>
    //   <Form>
    //     <FormControl>
    //       <FormLabel>Ingredient Name</FormLabel>
    //       <Input type="text" name="title" textAlign="center" />
    //     </FormControl>
    //   </Form>
    //   <Form>
    //     <FormControl>
    //       <FormLabel>Quantity</FormLabel>
    //       <Input type="number" name="qtn" textAlign="center" />
    //     </FormControl>
    //   </Form>
    //   <Form>
    //     <FormControl>
    //       <FormLabel>Expiry Date</FormLabel>
    //       <Input type="text" name="exp" textAlign="center" />
    //     </FormControl>
    //   </Form>
    //   <Form>
    //     <FormControl>
    //       <FormLabel>IMAGE</FormLabel>
    //       <Input type="text" name="exp" textAlign="center" />
    //     </FormControl>
    //   </Form>
    //   <Button type="submit">Submit</Button>
    // </Box>
  );
}

// export const createAction = async ({ request }) => {
//   const data = await request.formData()

//   const ingredient = {
//     name: data.get('name'),
//     quantity: data.get('quantity'),
//     expiry: data.get('expiry')
//   }

//   console.log(ingredient)
//   return redirect('/')
// }
