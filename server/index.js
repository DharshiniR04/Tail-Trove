const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const collection = require('./mongo');
const PetFood = require('./items');
const PetCloth = require('./cloth');
const Cart = require('./cart');
const PetToy = require('./Toys');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello");
})

app.post("/signup", async (req, res) => {
    const { fname, phone, email, pass } = req.body;
    try {
        const hashpass = await bcrypt.hash(pass, 10);
        await collection.insertMany({ fname, phone, email, pass: hashpass });
        res.status(200).json("Success");
    } catch (err) {
        console.log(err);
        res.status(500).json("Failed");
    }
});


app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await collection.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(pass, user.pass);
            if (match) {
                res.json("Success");
            }
            else {
                res.json("The password is incorrect");
            }
        }
        else {
            res.json("No record existed");
        }
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
})

app.post("/cart", async (req, res) => {
    const { email, image, name, price, cart } = req.body;
    try {
        const user = await collection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await Cart.create({ email, image, name, price, cart });
        res.sendStatus(200);
    }
    catch (error) {
        console.error("Error in submitting", error);
    }
});


app.post("/cartFind", async (req, res) => {
    const { email } = req.body;
    try {
        const cart = await Cart.find({ email });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})

app.post("/cartRemove", async (req, res) => {
    const { email } = req.body;
    try {
        await Cart.deleteMany({ email });
        res.json("Success");
    } catch (error) {
        console.error('Error removing items from the cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/petfood', async (req, res) => {
    try {
        const petFoodItems = await PetFood.find();
        res.json(petFoodItems);
    } catch (error) {
        console.error('Error fetching pet food data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/Clothes', async (req, res) => {
    try {
        const petClothItems = await PetCloth.find();
        res.json(petClothItems);
    } catch (error) {
        console.error('Error fetching pet food data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/Toys', async (req, res) => {
    try {
        const petToyItems = await PetToy.find();
        res.json(petToyItems);
    } catch (error) {
        console.error('Error fetching pet food data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log("Running...");
});
