const User = require("../models/user");

const getUser = async (userId) => {
  const user = await User.findById(userId);
  // const itemIndex = user.wishlist.findIndex1(item => item.product.equals(productId))
  return { user };
};

const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user;
  // console.log(productId, userId);

  try {
    const { user } = await getUser(userId);
    // console.log(user);

    if (user.wishlist.some((item) => item.product.toString() === productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    } // .some is similiar to .find only diff is some is used just to check the existance of something wheather it exist in db or not and give true/false, while find gives the value of that

    user.wishlist.push({ product: productId });
    await user.save();
    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const fetchWishlist = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate(
      "wishlist.product",
      "name images variants"
    );

    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteFromWishlist = async (req, res) => {
  const { productId } = req.query;
  const userId = req.user;

  try {
    const { user } = await getUser(userId);
    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    const updatedUser = await User.findById(userId).populate(
      "wishlist.product",
      "name price images"
    );
    res.status(200).json(updatedUser.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addToWishlist, fetchWishlist, deleteFromWishlist };
