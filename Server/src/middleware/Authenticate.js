import jwt from "jsonwebtoken";

export const Authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ error: true, message: "Access denied, token not provide." });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: true, message: error || "Invalid Token" });
  }
};
