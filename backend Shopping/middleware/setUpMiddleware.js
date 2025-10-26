const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const webhook = require("../routes/webhook")

const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use("/api/order", webhook);
};

module.exports = setupMiddleware;
