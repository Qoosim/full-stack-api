const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");
const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

// Connect to the database
connectDB();
// Routes
app.use('/', (req, res) => {
  res.send("Welcome to my Juubix");
})
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
app.use("/api/auth", authRoutes);
app.use("/api/posts", authMiddleware, postRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});