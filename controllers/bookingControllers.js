import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";
import { isAdminValid } from "./categoryControllers.js";

export function createBooking(req,res){
    if(!isCustomerValid(req)){
        res.status(403).json({
            message:"Frobidden"
        })
        return
    }

    const startingId=1200;
    Booking.countDocuments({}).then(
        (count)=>{
            console.log(count)
            const newId=startingId+count+1
            const newBooking=new Booking({
                bookingId:newId,
                roomId:req.body.roomId,
                email:req.user.email,
                start:req.body.start,
                end:req.body.end
            })
            newBooking.save().then(
                (result)=>{
                    res.json({
                        message:"Booking creation succesfully",
                        result:result
                    })
                }
            ).catch(
                (err)=>{
                    res.json({
                        message:"Booking creation failed",
                        err:err
                    })
                }
            )
        }
    )
}

//get booking
export function  getBooking(req,res){
    if(isAdminValid(req)){
        Booking.find({}).then(
            (booking)=>{
                res.json({
                    message:"All Booking list",
                    booking:booking
                })
            }
        ).catch(
            (err)=>{
                res.json({
                    message:"Cannot retreive all booking",
                    error:err
                })
            }
        )
    }else if(isCustomerValid(req)){
        Booking.find({email:req.user.email}).then(
            (booking)=>{
                res.json({
                    message:"Your Booking",
                    booking:booking
                })
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message: "Error retrieving bookings",
                    error: err
                })
            }
        )
    }else {
        res.status(403).json({
            message: "Forbidden: Access Denied"
        });
    }

}
//get item by booking id
export function getBookingById(req,res){
    if(!isAdminValid){
        return res.json({
         message:"Unauthorized"
        })
    }
    const bookingId = req.params.bookingId;
    Booking.findOne({bookingId:bookingId}).then(
        (result)=>{
            if(!result){
                res.json({
                    message:"Result Not found"
                })
            }else{
                res.json({
                    message:result
                })
            }
        }
    )


}
//update function
export function updateBooking(req,res){
    if(!isAdminValid){
       return res.json({
        message:"Unauthorized"
       })
    }
    const bookingId = req.params.bookingId;
    Booking.updateOne({ bookingId: bookingId }, req.body)
      .then(() => {
        res.json({
          message: "Booking updated successfully"
        });
      })
      .catch(() => {
        res.json({
          message: "Booking to update category"
        });
      });

}
