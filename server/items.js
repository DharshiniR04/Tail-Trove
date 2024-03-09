const mongoose = require('mongoose');

const petFoodSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    flavor: { type: String, required: true },
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

const PetFood = mongoose.model('items', petFoodSchema);

module.exports = PetFood;
