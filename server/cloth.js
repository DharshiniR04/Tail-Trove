const mongoose = require('mongoose');

const petClothSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

const PetCloth = mongoose.model('clothes', petClothSchema);

module.exports = PetCloth;
