import express from "express";
import Recipe from "../models/Recipe";
import authMiddleware from "../middleware/auth";
import Account from "../models/Account";

const router = express.Router();

router.post("/save", authMiddleware, async (req, res) => {
  const { recipeId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const account = Account.findById(req.userId);
    if (account.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe already saved" });
    }

    account.savedRecipes.push(recipeId);
    await account.save();

    res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving recipe.", error: error.message });
  }
});

router.get("/saved", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findById(req.userId).populate("savedRecipes");
    res.status(200).json({ recipes: account.savedRecipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipes.", error: error.message });
  }
});

export default router;
