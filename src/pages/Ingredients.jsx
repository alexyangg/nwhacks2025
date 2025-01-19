import { AddIcon, EditIcon, MinusIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, SimpleGrid, Text, Heading, HStack, Button, Divider, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Form, useLoaderData } from 'react-router-dom';

export default function Dashboard() {
  const tasks = useLoaderData()

  return (
    <SimpleGrid spacing="10px" minChildWidth="300px">
      {tasks && tasks.map(task => (
        <Card key={task.id} borderTop="8px" borderColor="green.400" bg="white">
          <CardHeader>
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <Text>AV</Text>
              </Box>
              <Box>
                <Heading as="h3" size="sm">{task.title}</Heading>
                <Text>by {task.author}</Text>
              </Box>
            </Flex>
          </CardHeader>

          <CardBody color="gray.500">
            <Text>{task.description}</Text>
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
  )
}

export const tasksLoader = async() => {
   const res = await fetch('http://localhost:3000/tasks')

   return res.json()
}
