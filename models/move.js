import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category: String,
    _id: String,
});

const moveSchema = new Schema(
    {
        detail: String,
        date: Date,
        amount: Number,
        category: categorySchema,
        moveType: String,
        payMethod: String,
        lastUpdateBy: String,
    },
    {
        timestamps: true,
    }
);

const Move = mongoose.models.Move || mongoose.model("Move", moveSchema);

export default Move;