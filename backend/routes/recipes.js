import express from "express";
import Recipe from "../models/Recipe.js";
import authMiddleware from "../middleware/auth.js";
import Account from "../models/Account.js";

const router = express.Router();

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
