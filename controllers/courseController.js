const Course=require("../models/Course");


exports.createCourse =async (req,res)=>{
    try{
     const courseData = req.body;

     const newCourse = new Course(courseData);
     const savedCourse = await newCourse.save();
 
     res.status(201).json({ success: true, course: savedCourse });
    }
    catch(err){
     console.log(err)
     res.status(500).json({ success: false, message: 'Server Error' });
    }
}

exports.getAllCourses=async (req,res)=>{
    try{
     
        const allcourse=await Course.find()
 
     res.status(201).json({success:true,data:allcourse});
    }
    catch(err){
     console.log(err)
     res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// Update a course by ID
exports.updateCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const updatedData = req.body;
  
      const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, {
        new: true,       // returns the updated document
        runValidators: true  // ensures validation rules run
      });
  
      if (!updatedCourse) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
  
      res.status(200).json({ success: true, course: updatedCourse });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  

  // Delete a course by ID
exports.deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
  
      const deletedCourse = await Course.findByIdAndDelete(courseId);
  
      if (!deletedCourse) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
  
      res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  