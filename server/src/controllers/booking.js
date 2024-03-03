import Bookings from "../models/booking.js";
import userSchema from "../models/user.js";

export const createBooking = async (req, res) => {
    try {
        const { spaCategory, spaService, date, startTime, endTime, userId } = req.body.bookinInfo;
console.log(userId);
console.log(req.body.bookinInfo.userId);
console.log(req.body);

        // Получаем пользователя, чтобы проверить, существует ли он
        const user = await userSchema.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        // Проверяем, если дата и время бронирования в прошлом
        const startDateTime = new Date(date + "T" + startTime);
        const currentDateTime = new Date();
        if (startDateTime < currentDateTime) {
            return res.status(400).json({ message: "Нельзя забронировать прошедшее время" });
        }

        // Проверяем, если конечное время больше чем начальное время
        const endDateTime = new Date(date + "T" + endTime);
        if (endDateTime <= startDateTime) {
            return res.status(400).json({ message: "Время окончания должно быть позже времени начала" });
        }

        // Проверяем, входит ли время бронирования в рабочее время (10:00 - 20:00)
        const bookingHour = startDateTime.getHours();
        if (bookingHour < 10 || bookingHour >= 20) {
            return res.status(400).json({ message: "Бронирование возможно только с 10:00 до 20:00" });
        }

        // Проверяем, существует ли уже бронирование для того же спа-сервиса в то же время
        const existingBooking = await Bookings.findOne({
            spaService: spaService,
            date: date,
            $or: [
                { $and: [{ startTime: { $lte: startTime } }, { endTime: { $gt: startTime } }] }, // Проверяем, попадает ли новое время начала бронирования между началом и окончанием существующего бронирования
                { $and: [{ startTime: { $lt: endTime } }, { endTime: { $gte: endTime } }] }, // Проверяем, попадает ли новое время окончания бронирования между началом и окончанием существующего бронирования
                { $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] } // Проверяем, попадает ли временной интервал существующего бронирования во временной интервал нового бронирования
            ]
        });
        if (existingBooking) {
            return res.status(400).json({ message: "Этот спа-сервис уже забронирован на выбранное время" });
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

        res.status(200).json(newBooking);
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
