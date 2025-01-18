import express from "express";
import Ingredient from "../models/Ingredient.js";
import Account from "../models/Account.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getIngredients);

// add an ingredient to account's inventory
router.post("/add", async (req, res) => {
  const { name, quantity, expiryDate, image } = req.body();
  try {
    const newIngredient = new Ingredient({
      name,
      quantity,
      expiryDate,
      image,
      user: req.userId, // link ingredient to the authenticated user
    });

    await newIngredient.save();

    const account = await Account.findById(req.userId);
    account.ingredients.push(newIngredient._id);
    await account.save();

    res.status(200).json({ message: "Ingredient added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding ingredient.", error: error.message });
  }
});

// get all ingredients from the account's inventory
router.get("/", authMiddleware, async (req, res) => {
  try {
    const account = Account.findById(req.userId).populate("ingredients");
    res.status(200).json({ ingredients: account.ingredients });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ingredients.", error: error.message });
  }
});

export default router;
