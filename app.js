require("dotenv").config();
const { application } = require("express");
const express = require("express");
const { router, taskRouter } = require("./routes/todoRoutes");

require("./config/database").connectDB(); //Connecting Database
const app = express();

// Built -m MIDDLWARE
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// home route
app.use("/", router);

// app.use("/:todoId", taskRouter )



app.listen(process.env.PORT, () => {
  console.log("Server started successfully on port:", process.env.PORT);
});
