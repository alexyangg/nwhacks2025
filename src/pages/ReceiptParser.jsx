import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Flex,
    Stack,
} from "@chakra-ui/react";

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [extractedItems, setExtractedItems] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file to upload.");
            setIsSuccess(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post("http://localhost:3000/process", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const items = response.data; // Get items from the backend
            setExtractedItems(items); // Save items to state
            setMessage("Image processed successfully!");
            setIsSuccess(true);
        } catch (error) {
            setMessage(`Error: ${error.response?.data || error.message}`);
            setIsSuccess(false);
        }
    };

    const handleFormSubmit = (event, index) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const updatedItem = {
            name: formData.get("title"),
            qty: formData.get("qtn"),
            weight: formData.get("exp"),
            image: formData.get("image"),
        };

        // Update the specific item in the state
        setExtractedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = updatedItem;
            return updatedItems;
        });

        console.log(`Updated item at index ${index}:`, updatedItem);
    };

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Upload an Image</h1>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ marginBottom: "20px" }}
            />
            <br />
            <button onClick={handleUpload} style={{ padding: "10px 20px" }}>
                Upload
            </button>
            {message && (
                <p style={{ marginTop: "20px", color: isSuccess ? "green" : "red" }}>
                    {message}
                </p>
            )}

            {extractedItems.length > 0 && (
                <Stack spacing={6} mt={10}>
                    {extractedItems.map((item, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            maxWidth="800px"
                            margin="auto"
                            bg="gray.50"
                        >
                            <form onSubmit={(event) => handleFormSubmit(event, index)}>
                                <Flex gap={4} wrap="wrap" align="center">
                                    <FormControl flex="1">
                                        <FormLabel>Ingredient Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="title"
                                            textAlign="center"
                                            defaultValue={item.name}
                                        />
                                    </FormControl>
                                    <FormControl flex="1">
                                        <FormLabel>Quantity</FormLabel>
                                        <Input
                                            type="number"
                                            name="qtn"
                                            textAlign="center"
                                            defaultValue={item.qty}
                                        />
                                    </FormControl>
                                    <FormControl flex="1">
                                        <FormLabel>Expiry Date</FormLabel>
                                        <Input
                                            type="text"
                                            name="exp"
                                            textAlign="center"
                                            placeholder="Enter expiry date"
                                        />
                                    </FormControl>
                                    <FormControl flex="1">
                                        <FormLabel>IMAGE</FormLabel>
                                        <Input
                                            type="text"
                                            name="image"
                                            textAlign="center"
                                            placeholder="Enter image URL"
                                        />
                                    </FormControl>
                                </Flex>
                                <Button type="submit" colorScheme="blue" mt={4} width="full">
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    ))}
                </Stack>
            )}
        </div>
    );
};

export default ImageUploader;
