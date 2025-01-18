import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body();

  try {
    const existingAccount = await Account.findOne({ email });

    if (existingAccount) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Account({
      name,
      email,
      password: hashedPassword,
    });

    await newAccount.save();

    res.status(201).json({ message: "Account registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering account.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body();

  try {
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: account._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ message: "Error loggin in.", error: error.message });
  }
});

export default router;
