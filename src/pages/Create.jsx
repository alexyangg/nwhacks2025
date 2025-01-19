import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Form } from 'react-router-dom';

export default function Create() {
  return (
    <Box>
      <Form>
        <FormControl>
          <FormLabel>Ingredient Name</FormLabel>
          <Input type="text" name="title" textAlign="center"/>
        </FormControl>
      </Form>
      <Form>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input type="number" name="qtn" textAlign="center"/>
        </FormControl>
      </Form>
      <Form>
        <FormControl>
          <FormLabel>Expiry Date</FormLabel>
          <Input type="text" name="exp" textAlign="center"/>
        </FormControl>
      </Form>
      <Form>
        <FormControl>
          <FormLabel>IMAGE</FormLabel>
          <Input type="text" name="exp" textAlign="center"/>
        </FormControl>
      </Form>
      <Button type='submit'>Submit</Button>
    </Box>
  )
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