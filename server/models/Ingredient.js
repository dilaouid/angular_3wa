import mongoose from "mongoose";

// creation du schema, un schema est une description de la
// structure d'un document

// c'est à dire les champs qu'il contient
// et leurs types
const IngredientsSchema = new mongoose.Schema({
    list: [String],
    pastryId: String
});

export const Ingredient = mongoose.model(
    'Ingredient',
    IngredientsSchema
);