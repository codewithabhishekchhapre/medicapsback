const express=require("express");
const Router=express.Router();
const courseController =require("../controllers/courseController")


Router.post("/create",courseController.createCourse)
Router.get("/all",courseController.getAllCourses)
Router.put('/update/:id', courseController.updateCourse);
Router.delete('/delete/:id', courseController.deleteCourse);

module.exports = Router;