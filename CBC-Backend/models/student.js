import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  username: String,
  gender: String,
  age: Number,
});

const Student = mongoose.model("student", studentSchema);

export default Student;
