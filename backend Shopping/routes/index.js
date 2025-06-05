const express = require("express");
const productRoutes = require("./productRouter");
const categoryRoutes = require("./categoryRouter");
const usersRoute = require("./userRouter");
const cartRoutes = require("./cartRouter");
const wishlistRoutes = require("./wishlistRouter");
const orderRouter = require("./orderRouter");
const {authMiddleware} = require("../middleware/authMiddleware");

const setupRoutes = (app) => {
  // Static image serving
  app.use("/images", express.static("public/images"));

  // Public routes
  app.use("/api/products", productRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/user", usersRoute);

  // Protected routes
  app.use("/api", authMiddleware, cartRoutes);
  app.use("/api", authMiddleware, wishlistRoutes);
  app.use("/api/order", authMiddleware, orderRouter);
};

module.exports = setupRoutes;