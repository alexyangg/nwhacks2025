import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    recipeId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // link back to the Account model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
