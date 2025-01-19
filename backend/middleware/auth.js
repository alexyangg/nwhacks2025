import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  //   const token = req.header("Authorization")?.replace("Bearer ", "");
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token: ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
