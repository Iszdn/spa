    import Bookings from "../models/booking.js";

    import userSchema from "../models/user.js"
    export const createBooking=async(req,res)=>{
        try {
            const {spaCategory,spaService,date,time,userId}=req.body
            const newBooking = new Bookings({
                spaCategory: spaCategory,
                spaService: spaService,
                date: date,
                time: time,
                user: userId
              });
        


            await newBooking.save()


            await userSchema.findByIdAndUpdate(userId, {
                $push: { booking: newBooking._id }, 
            });
            
            res.status(200).json("created")
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    export const getBooking=async(req,res)=>{
        try {
            const booking=await Bookings.find({}).populate("user").populate("spaCategory").populate("spaService")
            res.json(booking)
        } catch (error) {
            res.status(500).json({messsage:error})
        }
    }

    export const updateBooking=async(req,res)=>{
        try {
            const {id}=req.params
            const booking=await Bookings.findByIdAndUpdate(id,req.body)
            res.status(200).json("updated")
        } catch (error) {
            res.status(500).json({messsage:error})
        }
    }


    export const deleteBooking=async(req,res)=>{
        try {
            const {id}=req.params
            const booking=await Bookings.findByIdAndDelete(id)
            res.status(200).json("deleted")
        } catch (error) {
            res.status(500).json({messsage:error})
        }
    }


    export const getByIdBooking=async(req,res)=>{
        
        try {
            const {id}=req.params
            const booking=await Bookings.findById(id).populate("user").populate("spaCategory").populate("spaService")
            res.json(booking)
        } catch (error) {
            res.status(500).json({messsage:error})
        }
    }