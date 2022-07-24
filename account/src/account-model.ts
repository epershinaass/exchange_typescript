import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  login: String,
  password: String,
});

export default mongoose.model('Account', AccountSchema);