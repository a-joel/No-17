const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token Invalid" });
    }

    const token = authHeaders.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "saymyname");

      req.user = decoded;
      console.log(decoded);

      const userRole = decoded.role;
      console.log("The role is ", userRole);

      if (!userRole) {
        return res
          .status(403)
          .json({ message: "Access denied. Role not assigned." });
      }

      // ✅ Allow access if user's role is in allowedRoles
      if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
        return next(); // ✅ Authorized
      } else {
        return res.status(403).json({
          message: `Access denied. Role '${userRole}' not allowed.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "Error happened", error });
    }
  };
};

module.exports = authMiddleware;
