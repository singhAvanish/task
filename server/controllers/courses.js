import mongoose from "mongoose";
import Course from "../models/course.js";
import User from "../models/auth.js";

export const postCourse = async (req, res) => {
  try {
    const { userId } = req.params; 

   
    const {
      name,
      description,
      enrollmentStatus,
      thumbnail,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
    } = req.body;

    if (!name || !description || !enrollmentStatus || !thumbnail || !duration || !schedule || !location || !syllabus) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    if (user.role !== 'instructor') {
      return res.status(403).json({ message: 'Only instructors can add courses' });
    }

   
    const course = new Course({
      name,
      instructor: user.name, 
      description,
      enrollmentStatus,
      thumbnail,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
      students: [],
    });

    
    await course.save();


    user.coursesCreated.push(course._id);
    await user.save();

    return res.status(201).json(course);
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ message: 'Internal server error' });
  }
};




export const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({ message: 'User ID and Course ID are required' });
    }

   
    const course = await Course.findById(courseId).exec();
    const user = await User.findById(userId).exec();

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (!Array.isArray(course.students)) {
      course.students = []; 
    }

    
    if (course.students.includes(userId)) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

   
    course.students.push(userId);
    await course.save();

   
    user.coursesPurchased.push(courseId);
    await user.save();

    return res.status(200).json({ message: 'Successfully enrolled in course' });
  } catch (err) {
    console.error('Error enrolling user in course:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

   
    const course = await Course.findById(courseId).populate('students');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ students: course.students });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    
    const user = await User.findById(userId).populate({
      path: 'coursesPurchased',
      populate: { path: 'instructor', select: 'name' } 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    if (!user.coursesPurchased || user.coursesPurchased.length === 0) {
      return res.status(200).json({ message: 'No courses purchased', coursesPurchased: [] });
    }

  
    res.status(200).json({ coursesPurchased: user.coursesPurchased });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


