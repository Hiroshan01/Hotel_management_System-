import Room from "../models/room.js";
import { isAdminValid } from "./categoryControllers.js";

export function createRoom(req,res){
    if (!isAdminValid(req)) {
        return res.status(403).json({
          message: "Unauthorized"
        });
      }
      const newRoom=new Room(req.body)
      newRoom.save().then(
        (result)=>{
            res.status(401).json({
                message:result
            })
        }
      ).catch(
        (err)=>{
            res.status(403).json({
                message:"Frobidden"
            })
        }
      )


}

//delete rooms
export function deleteRoom(req,res){
    if (!isAdminValid(req)) {
        return res.status(403).json({
          message: "Unauthorized"
        });
      }
      const roomId=req.params.roomId
      Room.findOneAndDelete({roomId:roomId}).then(
        ()=>{
            res.status(401).json({
                message:"Room deteted sucessfully"
            })
        }

      ).catch(
        (err)=>{
            res.status(500).json({
                message:err
            })
        }
      )

}