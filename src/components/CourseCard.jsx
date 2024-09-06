
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { enrollCourse } from '../actions/auth';
import './CourseCard.css'; 

const CourseCard = ({ course, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.data);

  const handleEnroll = () => {
    if (user) {
      const userId = user.result._id;
     
      dispatch(enrollCourse(course._id, userId));
    } else {
    
      navigate('/Auth');
    }
  };

  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Duration: {course.duration}</p>
      <p>Schedule: {course.schedule}</p>
      <p>Location: {course.location}</p>
      <button onClick={handleEnroll}>Enroll</button>
      
      {children}
    </div>
  );
};

export default CourseCard;
