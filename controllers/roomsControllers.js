import Room from "../models/room.js";
import { isAdminValid } from "./categoryControllers.js"; //user validation

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
//get rooms
export function getRooms(req,res){
    if (!isAdminValid(req)) {
        return res.status(403).json({
          message: "Unauthorized"
        });
      }
      const roomId=req.params.roomId;
      Room.find({roomId}).then(

        (result)=>{
            if(result==null){
                res.status(404).json({
                    message:"Room Not Found"
                })
                return
            }else{
                res.json(
                    {
                        message:"Room found",
                        result:result
                    }
                )
            }
        }
      ).catch(
        (err)=>{
            res.json({
                message:"Room not found error"
            })
        }
      )

}

//update rooms
export function updateRooms(req,res){
    if (!isAdminValid(req)) {
        return res.status(403).json({
          message: "Unauthorized"
        });
      }
      
      const roomId=req.params.roomId
      Room.updateOne({roomId},req.body).then(
        ()=>{
            res.json({
                message:"Room Updated sucessfully"
            })
        }
      ).catch(
        (err)=>{
            res.json({
                message:err
            })
        }
      )
}