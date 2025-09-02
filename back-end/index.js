//Package import
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Route Import
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");

//DB Import
const dbConnection = require("./confiq/db-connection");

//Using the functions that comes from the package
app.use(express.json());
app.use(cors());

//Using the route files
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//Calling the db function
dbConnection();

//Base url for navigation
app.get("/", (req, res) => {
  return res.send(
    '<h1>🚀 API Navigation (Local Dev)</h1><ul><li><a href="/users">👥 View All Users</a></li><li><a href="/api/products">📦 View All Products</a></li><li><a href="/auth/register">📝 Register New User</a></li><li><a href="/auth/login">🔑 Login Existing User</a></li><li><a href="/api/product-add">➕ Add New Product (POST)</a></li><li><a href="/api/delete-product/123">🗑️ Delete Product (use real ID)</a></li></ul><p class="footer">Use<strong>Postman</strong> or <strong>curl</strong> for POST/DELETE requests.</p>'
  );
});

//Listening the port
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
