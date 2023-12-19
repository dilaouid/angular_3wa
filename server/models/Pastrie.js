import mongoose from "mongoose";

// creation du schema, un schema est une description de la
// structure d'un document

// c'est à dire les champs qu'il contient
// et leurs types
const PastriesSchema = new mongoose.Schema({
    ref: String,
    name: String,
    description: String,
    quantity: Number,
    order: Number,
    url: String,
    tags: [String],
    like: String,
    ingredients: [String],
    date: Date,
    choice: Boolean
});

export const Pastrie = mongoose.model(
    'Pastrie',
    PastriesSchema
);