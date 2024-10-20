const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const foodRouter = require("./routes/foodRoute.js");

// app config
const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());
dotenv.config({ path: ".env" });

// DB CONNECTION
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
