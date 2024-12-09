import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "Customer",
  },
  profilePicLink: {
    type: String,
    default:
      "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
