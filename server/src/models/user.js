import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto"
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      minLength: [2, "username must be minimum 3 character"],
      maxLength: [15, "username must be maximum 15 character"],
    },
    password: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, default: "user" },
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: "lilacBooking",
      },
    ],
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.emailVerification = function () {
  this.emailVerificationToken = crypto.randomBytes(20).toString("hex");
  this.emailVerificationExpires = Date.now() + 3600000;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Users = mongoose.model("users", userSchema);
export default Users;
