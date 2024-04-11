require("dotenv").config();

const express = require("express");
const cors = require("cors");

// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/api/films", productRoutes);

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.listen(port, () => {
  console.log(`Server run on port: ${port}`);
});
