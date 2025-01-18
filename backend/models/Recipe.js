import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    recipeId: {
      Type: String,
      required: true,
    },
    image: {
      Type: String,
    },
    title: {
      Type: String,
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
