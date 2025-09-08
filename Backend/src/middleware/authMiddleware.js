import admin from "../firebase.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken.admin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
