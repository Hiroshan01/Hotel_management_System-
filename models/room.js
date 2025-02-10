import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  roomId: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
   
  },
  maxGuests: {
    type: Number,
    required: true,
    default:3
  },
  photos: [
    {
        type:String
    }
  ],
 
  available: {
    type: Boolean,
    required:true,
    default: true
  },
  specialDecription:{
    type:String,
    default:""
  },
  notes:{
    type:String,
    default:""
  }
 
});

const Room=mongoose.model("room",roomSchema)
export default Room;
