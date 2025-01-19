import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Ingredients, { tasksLoader } from './pages/Ingredients'
import Create from './pages/Create'
import Landingpage from './pages/Landingpage'
import Login from './pages/Login'
import FoodBankLocator from './pages/FoodBankLocator'
import Recipes from './pages/Recipes'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<RootLayout />}>
        <Route index element={<Ingredients />} loader={tasksLoader} />
        <Route path="ingredients" element={<Ingredients />} loader={tasksLoader} />
        <Route path="recipes" element={<Recipes />}/>
        <Route path="create" element={<Create />} />
        <Route path="foodBankLocator" element={<FoodBankLocator />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
