import React, {useState} from "react";
import axios from "axios";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";

const Create = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [extractedItems, setExtractedItems] = useState([]);
    const [manualItems, setManualItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setExtractedItems([]); // Clear forms
        setMessage(""); // Clear messages
        setIsSuccess(false); // Reset success state
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file to upload.");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true); // Set loading to true when upload starts

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/api/process", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const items = response.data.map((item) => ({
                name: item.name || "",
                qty: item.qty || "",
                expiry: item.expiry || "",
                image: item.image || "",
            })); // Initialize state with extracted items
            setExtractedItems(items);
            setMessage("Image processed successfully!");
            setIsSuccess(true);
        } catch (error) {
            setMessage(`Error: ${error.response?.data || error.message}`);
            setIsSuccess(false);
        } finally {
            setIsLoading(false); // Set loading to false after the upload process
        }
    };

    const handleFieldChange = (index, field, value) => {
        setExtractedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index][field] = value;
            return updatedItems;
        });
    };

    const handleManualSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const newItem = {
            name: formData.get("title"),
            quantity: formData.get("qtn"),
            expiryDate: formData.get("exp"),
            image: formData.get("image"),
        };

        try {
            const token = localStorage.getItem("authToken"); // Assume the token is stored in localStorage

            const response = await axios.post(
                "http://localhost:5000/api/ingredients/add",
                newItem,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include the user's token
                    },
                }
            );

            console.log(response.data.message); // Log success message
            setManualItems((prevItems) => [...prevItems, newItem]); // Update local state to display new item
            event.target.reset(); // Clear the form
        } catch (error) {
            console.error(
                "Error adding ingredient:",
                error.response?.data || error.message
            );
        }
    };

    const handleImageSubmit = async (event, item) => {
        event.preventDefault();

        const newItem = {
            name: item.name,
            quantity: item.qty,
            expiryDate: item.expiry,
            image: item.image,
        };

        try {
            const token = localStorage.getItem("authToken"); // Assume the token is stored in localStorage

            const response = await axios.post(
                "http://localhost:5000/api/ingredients/add",
                newItem,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include the user's token
                    },
                }
            );

            console.log(response.data.message); // Log success message
            setManualItems((prevItems) => [...prevItems, newItem]); // Update local state to display new item
            event.target.reset(); // Clear the form
        } catch (error) {
            console.error(
                "Error adding ingredient:",
                error.response?.data || error.message
            );
        }
    };




    return (
        <Box p={6}>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Upload Image</Tab>
                    <Tab>Add Manually</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box textAlign="center">
                            <h1>Upload an Image</h1>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ marginBottom: "20px" }}
                            />
                            <br />
                            <Button
                                onClick={handleUpload}
                                style={{ padding: "10px 20px" }}
                                isDisabled={isLoading} // Disable button while loading
                                colorScheme="blue"
                            >
                                {isLoading ? "Uploading..." : "Upload"}
                            </Button>
                            {isLoading && (
                                <Flex justify="center" align="center" mt={4}>
                                    <Spinner size="lg" color="blue.500" />
                                    <Text ml={3}>Processing your image, please wait...</Text>
                                </Flex>
                            )}
                            {message && (
                                <p style={{ marginTop: "20px", color: isSuccess ? "green" : "red" }}>
                                    {message}
                                </p>
                            )}
                            {extractedItems.length > 0 && (
                                <Stack spacing={6} mt={10}>
                                    {extractedItems.map((item, index) => (
                                        <form
                                            key={index}
                                            onSubmit={(event) => handleImageSubmit(event, item)}
                                        >
                                            <Box
                                                borderWidth="1px"
                                                borderRadius="lg"
                                                p={4}
                                                maxWidth="800px"
                                                margin="auto"
                                                bg="gray.50"
                                            >
                                                <Flex gap={4} wrap="wrap" align="center">
                                                    <FormControl flex="1">
                                                        <FormLabel>Ingredient Name</FormLabel>
                                                        <Input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) =>
                                                                handleFieldChange(index, "name", e.target.value)
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl flex="1">
                                                        <FormLabel>Quantity</FormLabel>
                                                        <Input
                                                            type="number"
                                                            value={item.qty}
                                                            onChange={(e) =>
                                                                handleFieldChange(index, "qty", e.target.value)
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl flex="1">
                                                        <FormLabel>Expiry Date</FormLabel>
                                                        <Input
                                                            type="text"
                                                            value={item.expiry}
                                                            onChange={(e) =>
                                                                handleFieldChange(index, "expiry", e.target.value)
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl flex="1">
                                                        <FormLabel>Image URL</FormLabel>
                                                        <Input
                                                            type="text"
                                                            value={item.image}
                                                            onChange={(e) =>
                                                                handleFieldChange(index, "image", e.target.value)
                                                            }
                                                        />
                                                    </FormControl>
                                                </Flex>
                                                <Button
                                                    type="submit"
                                                    colorScheme="green"
                                                    mt={4}
                                                    width="full"
                                                >
                                                    Add Ingredient
                                                </Button>
                                            </Box>
                                        </form>
                                    ))}
                                </Stack>
                            )}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <form onSubmit={handleManualSubmit}>
                            <Stack spacing={4} maxWidth="500px" margin="auto">
                                <FormControl>
                                    <FormLabel>Ingredient Name</FormLabel>
                                    <Input type="text" name="title" textAlign="center" required/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Quantity</FormLabel>
                                    <Input type="number" name="qtn" textAlign="center" required/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <Input type="text" name="exp" textAlign="center" required/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Image URL</FormLabel>
                                    <Input type="text" name="image" textAlign="center"/>
                                </FormControl>
                                <Button type="submit" colorScheme="green">
                                    Add Ingredient
                                </Button>
                            </Stack>
                        </form>

                        {manualItems.length > 0 && (
                            <Stack spacing={4} mt={10}>
                                {manualItems.map((item, index) => (
                                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4} bg="gray.50">
                                        <p><strong>Name:</strong> {item.name}</p>
                                        <p><strong>Quantity:</strong> {item.qty}</p>
                                        <p><strong>Expiry Date:</strong> {item.expiry}</p>
                                        <p><strong>Image:</strong> {item.image}</p>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Create;
