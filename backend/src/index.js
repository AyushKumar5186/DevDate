const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("./configs/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/data", (req, res) => {
  res.send("Hello world bhai");
});

app.use("/api/v1/auth", authRoutes);        
// app.use("/api/v1/user", userRoutes);

app.listen(PORT,async () => {
    await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
