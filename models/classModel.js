import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: [],
  }],
});

const Class = mongoose.model('Class', classSchema); 

export default Class;