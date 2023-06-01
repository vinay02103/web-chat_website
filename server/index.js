const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/user");

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log(`Server running at ${port}`)))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
