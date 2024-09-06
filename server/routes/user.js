import express from 'express';
import { signup, login } from '../controllers/auth.js';
import { enrollCourse } from '../controllers/courses.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);


router.post('/courses/:courseId/enroll', enrollCourse);

export default router;
