require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./src/db/db");
const appointments = require("./src/routers/appointments");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", appointments);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
