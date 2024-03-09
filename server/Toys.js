const mongoose = require('mongoose');

const petToySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

const PetToy = mongoose.model('toys', petToySchema);

module.exports = PetToy;
