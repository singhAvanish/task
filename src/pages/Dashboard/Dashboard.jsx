


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnrolledCourses } from '../../actions/auth';
import './Dashboard.css';  

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data);

  const userId = authData?.result?._id;

  useEffect(() => {
    const getCourses = async () => {
      try {
        if (userId) {
          console.log('Fetching courses for user ID:', userId);
          const fetchedCourses = await dispatch(fetchEnrolledCourses(userId));
          setCourses(fetchedCourses || []);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    getCourses();
  }, [userId, dispatch]);

  const calculateProgress = (course) => {
    const syllabus = course.syllabus || [];
    const totalWeeks = syllabus.length;
    const completedWeeks = syllabus.filter((week) => week.completed).length;
    const progress = totalWeeks > 0 ? (completedWeeks / totalWeeks) * 100 : 0;
    return progress;
  };

  return (
    <div className="dashboard">
      <h1>Your Enrolled Courses</h1>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor}</p>
              <p>Duration: {course.duration}</p>
              <p>Schedule: {course.schedule}</p>
              <p>Location: {course.location}</p>
              <div className="progress-container">
                <label>Progress:</label>
                <progress value={calculateProgress(course)} max="100"></progress>
                <span>{calculateProgress(course).toFixed(2)}%</span>
              </div>
            </div>
          ))
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
