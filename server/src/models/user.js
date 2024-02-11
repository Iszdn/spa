import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
const { Schema } = mongoose;

const userSchema = new Schema({
    lastname:{type:String},
    firstname:{type:String},
  username: {type:String}, 
  password: {type:String},
  email: {type:String},
  role:{type:String,default:"user"}
},{timestamps:true});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
next()
  }

const  salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt)
})
userSchema.methods.matchPassword=async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}
const Users = mongoose.model('users', userSchema);
export default Users