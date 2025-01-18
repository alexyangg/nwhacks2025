import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      Type: String,
      required: true,
    },
    quantity: {
      Type: Number,
      required: true,
    },
    expiryDate: {
      Type: Date,
      required: true,
    },
    image: {
      Type: String,
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

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
