const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const webhook = require("../routes/webhook")

const setupMiddleware = (app) => {
 app.use('/api/order/webhook', express.raw({ type: 'application/json' }));
 app.use('/api/order', webhook);
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(cookieParser());
};

module.exports = setupMiddleware;
