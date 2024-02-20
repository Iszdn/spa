import Bookings from "../models/booking.js";
import userSchema from "../models/user.js";

export const createBooking = async (req, res) => {
    try {
        const { spaCategory, spaService, date, startTime, endTime, userId } = req.body;

        // Get the user to check if they exist
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the end time is greater than start time
        const startDateTime = new Date(date + "T" + startTime);
        const endDateTime = new Date(date + "T" + endTime);
        if (endDateTime <= startDateTime) {
            return res.status(400).json({ message: "End time must be greater than start time" });
        }

        // Check if the booking time is within working hours (10:00 - 20:00)
        const bookingHour = startDateTime.getHours();
        if (bookingHour < 10 || bookingHour >= 20) {
            return res.status(400).json({ message: "Booking can only be made between 10:00 and 20:00" });
        }

        // Check if there is any existing booking for the same spa service at the same time
        const existingBooking = await Bookings.findOne({
            spaService: spaService,
            date: date,
            $or: [
                { $and: [{ startTime: { $lte: startTime } }, { endTime: { $gt: startTime } }] }, // Check if new booking start time falls between existing booking's start and end time
                { $and: [{ startTime: { $lt: endTime } }, { endTime: { $gte: endTime } }] }, // Check if new booking end time falls between existing booking's start and end time
                { $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] } // Check if existing booking's time frame is within the new booking's time frame
            ]
        });
        if (existingBooking) {
            return res.status(400).json({ message: "This spa service is already booked for the selected time" });
        }

        const newBooking = new Bookings({
            spaCategory: spaCategory,
            spaService: spaService,
            date: date,
            startTime: startTime,
            endTime: endTime,
            user: userId
        });

        await newBooking.save();

        await userSchema.findByIdAndUpdate(userId, {
            $push: { booking: newBooking._id },
        });

        res.status(200).json("created");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getBooking = async (req, res) => {
    try {
        const booking = await Bookings.find({}).populate("user").populate("spaCategory").populate("spaService");
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Bookings.findByIdAndUpdate(id, req.body);
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Bookings.findByIdAndDelete(id);
        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getByIdBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Bookings.findById(id).populate("user").populate("spaCategory").populate("spaService");
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
