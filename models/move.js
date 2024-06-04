import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category: String,
    _id: String,
});

const moveSchema = new Schema(
    {
        detail: String,
        date: String,
        amount: Number,
        category: categorySchema,
        moveType: String,

    },
    {
        timestamps: true,
    }
);

const Move = mongoose.models.Move || mongoose.model("Move", moveSchema);

export default Move;