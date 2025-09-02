const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/user-schema');
const authMiddleware = require('../authmiddlewares/auth-middleware')
// ✅ Move cors() to main app.js if possible
// But this works for now
router.use(cors());

// GET /users - Get all users
router.get('/', authMiddleware(["admin"]), async (req, res) => {
  try {
    const allUsers = await User.find({}, '-password'); // Exclude password
    console.log("Users fetched");
    return res.status(200).json({ data: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /auth/register
router.post('/auth/register', async (req, res) => {
  const { name, email, role, password } = req.body;

  // ✅ 1. Validate required fields
  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: "Name, Email, Role, and Password are required" });
  }

  // ✅ 2. Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // ✅ 3. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // ✅ 4. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered. Please log in." });
    }

    // ✅ 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 6. Create and save new user
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("New user registered:", email);

    // ✅ 7. Return success (exclude password)
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "Registration successful",
      data: userResponse,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
});

// POST /auth/login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // ✅ 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // ✅ 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ 3. Compare password (user.password is the hash from DB)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ 4. Generate JWT
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      "saymyname", // 🔐 Use process.env.JWT_SECRET in production
      { expiresIn: "5h" }
    );

    // ✅ 5. Return success
    console.log("Login successful:", email);
    console.log("Token: ", token);
    
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error occurred", error: error.message });
  }
});

module.exports = router;