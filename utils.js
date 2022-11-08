import jwt from "jsonwebtoken";

// const JWT_SECRET = "jdgkqykfsgdabvjfkag.ioldagdvcamkvcmsv";

export const generateToken = (userData) =>
  jwt.sign(
    {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
    },
    process.env.JWT_SECRET
  );

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("authToken");
    if (!token) return res.status(401).json("Access Denied");

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(401).json("Invalid Token");
  }
};
