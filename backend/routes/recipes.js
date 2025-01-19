import express, { response } from "express";
import Recipe from "../models/Recipe.js";
import authMiddleware from "../middleware/auth.js";
import Account from "../models/Account.js";
import axios from "axios";

const router = express.Router();

const NUM_RECIPES = 2;
let fetchedRecipes = [];

// add a recipe
router.post("/save", authMiddleware, async (req, res) => {
  //   const { recipeId } = req.body;
  const { recipeId, title, image } = req.body;

  try {
    const newRecipe = new Recipe({
      recipeId,
      title,
      image,
      user: req.userId,
    });

    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "No user ID found - are you authenticated?" });
    }

    await newRecipe.save();

    const account = await Account.findById(req.userId);
    account.savedRecipes.push(newRecipe._id);
    await account.save();

    res.status(200).json({ message: "Recipe added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving recipe.", error: error.message });
  }
});

// get all user's recipes
router.get("/saved", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findById(req.userId).populate("savedRecipes");

    const recipes = await Recipe.find({ user: req.userId });
    console.log("Found recipes:", recipes);
    // res.status(200).json({ ingredients: account.ingredients });
    res.status(200).json(recipes);

    // res.status(200).json({ recipes: account.savedRecipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipes.", error: error.message });
  }
});

// get recipes from the Spoonacular API based on the user's current ingredients
router.get("/recommend", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findById(req.userId).populate("ingredients");

    if (!account || !account.ingredients || account.ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: "No ingredients found for this user." });
    }

    const ingredientList = account.ingredients
      .map((ingredient) => ingredient.name)
      .join(",");
    console.log(ingredientList);
    // const fetchedRecipes = response.data.map((recipe) => ({
    //     recipeId: recipe.id,
    //     title: recipe.title,
    //   }));
    //   console.log(fetchedRecipes);
    // const { ingredients } = req.query;
    // const ingredientList = ingredients.join(",");
    // const ingredientList = Array.isArray(ingredients)
    //   ? ingredients
    //   : ingredients.split(",");

    // console.log("Selected Ingredients: ", ingredientList);

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredientList,
          number: NUM_RECIPES,
          apiKey,
        },
      }
    );

    fetchedRecipes = response.data.map((recipe) => ({
      recipeId: recipe.id,
      title: recipe.title,
    }));
    console.log(fetchedRecipes);

    // res.status(200).json(response.data);
    res.status(200).json(fetchedRecipes); // send the recipe id and title only first
  } catch (error) {
    console.error("Error fetching recipes from API: ", error);
    res.status(500).json({
      message: "Error fetching recipes from API",
      error: error.message,
    });
  }
});

router.get("/recipe/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Recipe ID is required." });
  }

  try {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const recipeInstructionsResponse = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`,
      {
        params: {
          apiKey,
        },
      }
    );

    // const recipeInstructions = {
    //   id: recipeInstructionsResponse.data.id,
    //   title: recipeInstructionsResponse.data.title,
    //   image: recipeInstructionsResponse.data.image,
    //   ingredients: recipeInstructionsResponse.data.ingredients,
    //   steps: recipeInstructionsResponse.data.steps,
    // };
    // console.log(recipeInstructions);

    res.status(200).json(recipeInstructionsResponse.data);
  } catch (error) {
    console.error("Error fetching recipe details: ", error.message);
    res.status(500).json({
      message: "Error fetching recipe details.",
      error: error.message,
    });
  }
});

export default router;
