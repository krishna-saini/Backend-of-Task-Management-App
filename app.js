require("dotenv").config();
const express = require("express");
const  todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes")

require("./config/database").connectDB(); //Connecting Database
const app = express();

// Built -m MIDDLWARE
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
// alltodos route
app.use("/", todoRouter);
app.use("/", userRouter)


// lsitening at server 
app.listen(process.env.PORT, () => {
  console.log("Server started successfully on port:", process.env.PORT);
});
