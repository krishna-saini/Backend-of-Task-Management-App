require("dotenv").config();
const express = require("express");
const { router } = require("./routes/todoRoutes");

require("./config/database").connectDB(); //Connecting Database
const app = express();

// MIDDLWARE
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server started successfully on port:", process.env.PORT);
});
