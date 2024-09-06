import express from 'express';
import { getCourse } from '../controllers/courses.js';

const router = express.Router();

router.get('/',getCourse)

export default router;