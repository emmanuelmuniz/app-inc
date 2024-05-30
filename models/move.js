import mongoose, { Schema } from "mongoose";

const moveSchema = new Schema(
    {
        detail: String,
        date: String,
        amount: Number,
        moveType: String,
    },
    {
        timestamps: true,
    }
);

const Move = mongoose.models.Move || mongoose.model("Move", moveSchema);

export default Move;