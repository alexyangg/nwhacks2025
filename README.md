# WasteNot

A smart, user-friendly web application designed to reduce food waste and insecurity by generating recipe ideas based on the ingredients you have at home. Say goodbye to meal planning stress and hello to easy, creative cooking!

This project was shortlisted as one of the top 10 out of 81 submissions for the Telus Sponsor Prize at nwHacks 2025. Check out the Devpost [here](https://devpost.com/software/wastenot-gomst0)!

---

## Features

- **Ingredient Selection:** Upload a photo of grocery receipts and our app will automatically add those ingredients to your ingredients list! Alternatively, users can manually input ingredients using text forms.
- **Recipe Recommendations:** Get recipe suggestions tailored to your selected ingredients. Recipes are fetched using the Spoonacular API.
- **Save Recipes:** Save your favourite recipes to your account for future reference.
- **Local Food Bank Locator:** Locate nearby food banks through integration with Google Maps.
- **User Authentication:** Secure login to ensure access to users' saved ingredients and recipes.

---

## Technologies Used

### Frontend
- React.js
- Chakra UI

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Spoonacular API
- Google Maps API
- Google Document AI

### Authentication
- JWT (JSON Web Token)

---

## API Endpoints

### Authentication
- **POST** `/api/auth/signup`: Sign up for a new account.
- **POST** `/api/auth/login`: Log in as an existing user.

### Ingredients
- **GET** `/api/ingredients`: Fetch the user's ingredients.
- **POST** `/api/ingredients/add`: Add ingredients to the user's account.

### Recipes
- **GET** `/api/recipes/recommend`: Get recipe suggestions based on selected ingredients.
- **GET** `/api/recipes/saved`: Get all the user's saved recipes.
- **GET** `/api/recipes/:id`: Get detailed recipe instructions based on recipe id.
- **POST** `/api/recipes/save`: Save a recipe to the user's account.

---

## Future Features
- **Image recognition:** Allow users to take photos of their pantry and then our app will analyze the ingredients based on the photo.
- **Expiry date recognition based on item:** Utilize AI to determine when a food item will expire.
- **Mobile integration:** Port the web app to mobile for convenience taking photos.

---

## Installation

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/alexyangg/nwhacks2025.git
   ```
2. Navigate to the backend folder:
   ```bash
   cd nwhacks2025/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   SPOONACULAR_API_KEY=<your-spoonacular-api-key>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```
5. Start the server:
   ```bash
      nodemon server.js
   ```

### Frontend Setup
1. Navigate to the root:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The backend should be running on `http://localhost:5000`.

The frontend should be running on `http://localhost:5173`.
