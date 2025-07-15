const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/data", (req, res) => {
  res.send("Hello world bhai");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
