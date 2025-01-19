import { AtSignIcon, EditIcon, Search2Icon, StarIcon, } from '@chakra-ui/icons';
import { color, List, ListIcon, ListItem, Heading, Container } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Container>
        <Heading
            bgGradient="linear(to-r, green.400, yellow.400, orange.400)" // Gradient from green to yellow to orange
            bgClip="text" // Clip the gradient to the text
            marginBottom="30px"
        >
            WasteNot
        </Heading>
        <List color="white" font="1.2em" spacing={4}>
            <ListItem>
                <NavLink to="/">
                    <ListIcon as={StarIcon} color="white" />
                    Homepage
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/dashboard/ingredients">
                    <ListIcon as={EditIcon} color="white" />
                    Ingredients
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/dashboard/recipes">
                    <ListIcon as={EditIcon} color="white" />
                    Recipes
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/dashboard/create">
                    <ListIcon as={AtSignIcon} color="white" />
                    Add Ingredients
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/dashboard/foodBankLocator">
                    <ListIcon as={Search2Icon} color="white" />
                    Food Bank Locator
                </NavLink>
            </ListItem>
        
        </List>
    </Container>
  )
}
