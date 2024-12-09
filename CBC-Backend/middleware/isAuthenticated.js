import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ error: "Authorization header missing" });
  const token = req.header("Authorization").replace("Bearer", "").trim();

  if (token) {
    jwt.verify(token, "CBC-Backend", (error, decoded) => {
      if (error) {
        console.error("Invalid token");
        return res.status(401).json({ error: "Invalid token" }); // Respond with 401 and stop further execution
      }

      req.user = decoded; // Attach decoded token to the request
      next(); // Proceed to the next middleware or route handler
    });
  }
};
export default authenticate;
