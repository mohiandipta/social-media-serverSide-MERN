import { mongoose } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    fName: {
        type: String,
        trim: true,
        required: true
    },
    lName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: 6,
        max: 64
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    about: {},
    photo: string,
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }]
},
    { timestamp: true }
);

export default mongoose.model('User', userSchema)