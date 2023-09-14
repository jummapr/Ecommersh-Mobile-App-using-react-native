import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Product = new mongoose.model("Product",schema)