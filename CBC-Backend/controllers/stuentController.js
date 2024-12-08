import Student from "../models/student.js";

export const getStudent = async (req, res) => {
  try {
    const result = await Student.find();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const createStudent = async (req, res) => {
  try {
    await Student.create(req.body);
    res.status(200).json({ message: "new student added suceesful" });
  } catch (err) {
    console.log(err);
  }
};
export const deleteStudent = async (req, res) => {
  try {
    const username = req.body.username;
    await Student.deleteOne({ username });
  } catch (err) {
    console.log(err);
  }
};
