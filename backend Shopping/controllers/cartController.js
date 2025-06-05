const User = require("../models/user");

//finds user and cart detail from db(used in every route kept outside to make code optimize and fewer db query)
const getUserAndCartItem = async (userId, productId, size) => {
  const user = await User.findById(userId);
  const itemIndex = user.cart.findIndex(
    (item) => item.product.equals(productId) && item.variant.size === size
  );
  return { user, itemIndex };
};

const addingToCart = async (req, res) => {
  const { productId, quantity, size, newPrice, oldPrice } = req.body;
  const userId = req.user;
  // console.log("Received data:", { userId, productId, quantity, size, newPrice});

  try {
    const { user, itemIndex } = await getUserAndCartItem(
      userId,
      productId,
      size
    );
    // console.log(user,itemIndex)

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({
        product: productId,
        quantity,
        variant: { size, newPrice, oldPrice },
      });
    }
    // console.log(user.cart)

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchingCart = async (req, res) => {
  try {
    const userId = req.user;
    // console.log("from cart",userId);

    const user = await User.findById(userId).populate({
      path: "cart.product",
      model: "Product",
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user.cart)
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cartItemUpdatation = async (req, res) => {
  const { productId, quantity, size } = req.body;
  const userId = req.user;

  try {
    const { user, itemIndex } = await getUserAndCartItem(
      userId,
      productId,
      size
    );

    if (itemIndex > -1) {
      if (quantity) user.cart[itemIndex].quantity = quantity;
    }
    if (quantity <= 0) {
      user.cart.splice(itemIndex, 1);
    }
    await user.save();

    const updatedUser = await User.findById(userId).populate({
      path: "cart.product",
      model: "Product",
    });
    // console.log("Updated Cart:", updatedUser.cart);
    res.status(200).json(updatedUser.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cartItemDeletion = async (req, res) => {
  const { productId, size } = req.query;
  const userId = req.user;

  try {
    const { user, itemIndex } = await getUserAndCartItem(
      userId,
      productId,
      size
    );

    if (itemIndex > -1) {
      user.cart.splice(itemIndex, 1);
      await user.save();
    }

    const updatedUser = await User.findById(userId).populate({
      path: "cart.product",
      model: "Product",
    });
    res.status(200).json(updatedUser.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addingToCart, fetchingCart, cartItemUpdatation, cartItemDeletion}