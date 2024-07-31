const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const http = require('http');

const userRoutes = require("./Routes/userRoutes");
const communityRoutes = require('./Routes/CommunityRoutes');
const messageRoutes = require('./Routes/messageRoutes');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/bee/user', userRoutes);
app.use('/bee/community', communityRoutes);
app.use('/bee/message', messageRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Connected to Database: `, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });