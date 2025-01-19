import { AddIcon, EditIcon, MinusIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, SimpleGrid, Text, Heading, HStack, Button, Divider, FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import { Form, useLoaderData } from 'react-router-dom';

export default function Dashboard() {
  const ingredients = useLoaderData()

  return (
    <Box>
      <Heading mb="20px" textAlign="center">Fresh Ingredients!!</Heading>

      <SimpleGrid spacing="10px" minChildWidth="300px">
        {ingredients && ingredients.map(ingredient => (
          <Card key={ingredient.id} borderTop="8px" borderColor="green.400" bg="white">
            <CardHeader>
              <Box bgColor="green.200" maxH="180px"  overflow="hidden">
                <Image
                  src={ingredient.img} // Replace with your image URL
                  alt="Placeholder image"
                  objectFit="cover"
                  objectPosition="center"
                  w="100%"
                  h="100%"
                />
              </Box>
            </CardHeader>

            <CardBody color="gray.500">
              <Flex gap={5}>
               <Box>
                 {/* <Heading as="h3" size="sm">{ingredient.title}</Heading> */}
                 <Heading as="h3" size="sm">Ingredient name</Heading>
                 {/* <Text>by {ingredient.author}</Text> */}
               </Box>
             </Flex>
              {/* <Text>{ingredient.description}</Text> */}
            </CardBody>

            <Divider borderColor="gray.200" />

            <CardFooter>
              <HStack>
                <Button variant={'ghost'} leftIcon={<AddIcon />}>Add</Button>
                <Form>
                  <FormControl>
                    {/* <FormLabel>Edit Amount</FormLabel> */}
                    <Input type="text" name="title" placeHolder="3" textAlign="center"/>
                  </FormControl>
                </Form>

                <Button variant={'ghost'} leftIcon={<MinusIcon />}>Remove</Button>
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>  
    </Box>
  )
}

export const tasksLoader = async() => {
   const res = await fetch('http://localhost:3000/tasks')

   return res.json()
}
