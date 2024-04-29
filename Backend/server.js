const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")
const userRoutes = require("./Routes/user")

//Middleware
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/bee/user', userRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & Api is running on port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

