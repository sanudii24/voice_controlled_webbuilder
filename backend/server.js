const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/voicebuilder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ElementSchema = new mongoose.Schema({
    type: String,
    text: String
});
const Element = mongoose.model("Element", ElementSchema);

// API to get elements
app.get("/elements", async (req, res) => {
    const elements = await Element.find();
    res.json(elements);
});

// API to add elements
app.post("/elements", async (req, res) => {
    const { type, text } = req.body;
    const newElement = new Element({ type, text });
    await newElement.save();
    res.status(201).json(newElement);
});

app.listen(5001, () => console.log("Server running on port 5001"));
