import mongoose from "mongoose";

const {Schema,model} = mongoose;

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:false
    },
    date: { type: Date, default: Date.now }
});
const Todo = model("Tododb",todoSchema)
export {Todo}