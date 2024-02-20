import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
    
  spaCategory: {
    type: Schema.Types.ObjectId,
    ref: "lilacSpaserviceCategory"
  },   
  spaService: {
    type: Schema.Types.ObjectId,
    ref: "lilacSpaservice"
  }, 
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Başlangıç saati
  endTime: { type: String, required: true }, // Bitiş saati
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }

}, { timestamps: true });

const Bookings = mongoose.model('lilacBooking', BookingSchema);

export default Bookings;
