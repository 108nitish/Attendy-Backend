import Student from '../models/studentModel.js';
import Class from '../models/classModel.js';
 

const getStudents = async (req, res) => {
  try {
    const _class = await Class.findById(req.classId);
    const students = await _class.populate('students').execPopulate();
    res.json({sucess : true, data : students}); 
  } catch (error) {
    res.json({sucess : false, message: error.message });
  }
};
 
const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    res.json({sucess : true, data : student});
    }
    catch (error) { 
    res.json({sucess: false, message: 'Student not found' });
    }
};
 
const createStudent = async (req, res) => {
  const { name, rollNo, faceDescriptor, classId } = req.body;
  try { 
    if (!classId) {
      return res.json({ sucess: false, message: "Class ID is required" });
    }
 
    const student = await Student.create({ name, rollNo, faceDescriptor });
 
    const _class = await Class.findById(classId); 
    if (!_class) {
      return res.json({ sucess: false, message: "Class not found" });
    }
 
    _class.students.push(student._id);
    await _class.save();

    return res.json({ sucess: true, message: "Student Created" });
  } catch (error) {
    console.error("Error:", error);
    return res.json({ sucess: false, message: "Student not created", error: error.message });
  }
};

 
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, rollNo, faceDescriptor } = req.body;
  try {
    const student = await Student.findById(id);
    student.name = name;
    student.rollNo = rollNo;
    student.faceDescriptor = faceDescriptor;
    await student.save();
    res.json({sucess : true, data : student});
    }
    catch (error) {
    res.json({sucess: false, message: "Student not updated" });
    }
};


const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    await student.remove();
    res.json({sucess : true, message: "Student deleted" });
    }
    catch (error) {
    res.json({sucess: false, message: "Student not deleted" });
    }
};

export { getStudents, getStudent, createStudent, updateStudent, deleteStudent };