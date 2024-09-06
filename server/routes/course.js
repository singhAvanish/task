import express from 'express';
import { postCourse,  enrollCourse } from '../controllers/courses.js';
import { getEnrolledCourses } from '../controllers/auth.js';

const router = express.Router();


router.post('/:userId', postCourse);


router.post('/:userId/enroll/:courseId', enrollCourse);
router.get('/enrolled/:userId', getEnrolledCourses);


export default router;
