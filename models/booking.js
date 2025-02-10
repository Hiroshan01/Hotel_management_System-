import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    bookingId:{
        type:Number,
        required:true,
        unique:true
    },
    roomId:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    stutus:{
        type:String,
        required:true,
        default:"pending"
    },
    reason:{
        type:String,
        default:""
    },
    start:{
        type:Date,
        default:""
    },
    end:{
        type:Date,
        default:""
    },
    note:{
        type:String,
        default:""
    }
})
const Booking=mongoose.model("booking",bookingSchema)
export default Booking;