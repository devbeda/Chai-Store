import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
    },
    productImage:{
        type: String,
    }
})

export const Product = mongoose.model("Product", productSchema)