import mongoose from 'mongoose';
import Class from '../models/classModel.js';

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({teacherId : req.userId});

    res.json({sucess : true, classes : classes || [] });
  } catch (error) {
    res.json({sucess : false, message: error.message });
  }
}

const getClass = async (req, res) => {
  const classId = req.params.id;
  try {
    const classData = await Class.findById(classId).populate({path: "students", select: "name rollNo attendance"}); 

    res.json({sucess : true, classData : classData || {} });
  } catch (error) {
    res.json({sucess : false, message: error.message });
  }
}

const createClass = async (req, res) => {
  try {
    const _class = await Class.create({ ...req.body, teacherId : req.userId });

    res.json({sucess : true, class : _class, message: 'Class created successfully' });
  } catch (error) {
    res.json({sucess : false, message: 'Error in Creating Class' });
  }
}

const updateClass = async (req, res) => {
  try {
    const _class = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });  
    res.json({sucess : true, class : _class, message: 'Class updated successfully' });
    }
    catch (error) {
    res.json({sucess : false, message: 'Error in Updation' });
    }
}

const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({sucess : true, message: 'Class deleted successfully' });
  } catch (error) {
    res.json({sucess : false, message: 'Error in Deletion' });
  }
}

export { getClasses, getClass, createClass, updateClass, deleteClass };