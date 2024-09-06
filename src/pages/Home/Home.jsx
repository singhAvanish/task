

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeCourses } from '../../actions/auth';
import CourseCard from '../../components/CourseCard';
import SearchBar from '../../components/SearchBar';
import './Home.css';  

const Home = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.home);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    dispatch(fetchHomeCourses());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleSearch = (query) => {
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="home">
      <h1>Courses</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

