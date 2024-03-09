const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  email: {
    type:String,
    required:true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cart:{
    type: Number,
    required: true,
  }
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;