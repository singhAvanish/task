
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCourse } from '../../actions/auth';
import './CourseForm.css'; 

const CourseForm = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  
  const authData = useSelector((state) => state.auth?.data || null);
  const instructorName = authData?.result?.name || 'Unknown Instructor';

  const [courseData, setCourseData] = useState({
    name: '',
    instructor: instructorName,
    description: '',
    enrollmentStatus: 'Open',
    thumbnail: '',
    duration: '',
    schedule: '',
    location: '',
    prerequisites: [''],
    syllabus: [{ week: 1, topic: '', content: '' }],
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSyllabusChange = (index, e) => {
    const updatedSyllabus = [...courseData.syllabus];
    updatedSyllabus[index][e.target.name] = e.target.value;
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  const addSyllabusEntry = () => {
    setCourseData({
      ...courseData,
      syllabus: [...courseData.syllabus, { week: courseData.syllabus.length + 1, topic: '', content: '' }]
    });
  };

  const removeSyllabusEntry = (index) => {
    const updatedSyllabus = courseData.syllabus.filter((_, i) => i !== index);
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!authData) {
      console.error('User is not authenticated');
      return;
    }

    dispatch(createCourse(userId, courseData));

    setCourseData({
      name: '',
      instructor: instructorName,
      description: '',
      enrollmentStatus: 'Open',
      thumbnail: '',
      duration: '',
      schedule: '',
      location: '',
      prerequisites: [''],
      syllabus: [{ week: 1, topic: '', content: '' }]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Course</h2>

      <label>Course Name:</label>
      <input type="text" name="name" value={courseData.name} onChange={handleChange} required />

      <label>Instructor:</label>
      <input type="text" name="instructor" value={courseData.instructor} readOnly required />

      <label>Description:</label>
      <textarea name="description" value={courseData.description} onChange={handleChange} required />

      <label>Thumbnail URL:</label>
      <input type="text" name="thumbnail" value={courseData.thumbnail} onChange={handleChange} required />

      <label>Duration:</label>
      <input type="text" name="duration" value={courseData.duration} onChange={handleChange} required />

      <label>Schedule:</label>
      <input type="text" name="schedule" value={courseData.schedule} onChange={handleChange} required />

      <label>Location:</label>
      <input type="text" name="location" value={courseData.location} onChange={handleChange} required />

      <label>Enrollment Status:</label>
      <select name="enrollmentStatus" value={courseData.enrollmentStatus} onChange={handleChange}>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
        <option value="In Progress">In Progress</option>
      </select>

      <label>Prerequisites:</label>
      {courseData.prerequisites.map((prerequisite, index) => (
        <input
          key={index}
          type="text"
          value={prerequisite}
          onChange={(e) => {
            const updatedPrerequisites = [...courseData.prerequisites];
            updatedPrerequisites[index] = e.target.value;
            setCourseData({ ...courseData, prerequisites: updatedPrerequisites });
          }}
        />
      ))}

      <label>Syllabus:</label>
      {courseData.syllabus.map((item, index) => (
        <div key={index} className="syllabus-item">
          <label>Week {index + 1}:</label>
          <input
            type="number"
            name="week"
            value={item.week}
            onChange={(e) => handleSyllabusChange(index, e)}
            min="1"
            required
          />

          <input
            type="text"
            name="topic"
            value={item.topic}
            onChange={(e) => handleSyllabusChange(index, e)}
            placeholder="Topic"
            required
          />

          <textarea
            name="content"
            value={item.content}
            onChange={(e) => handleSyllabusChange(index, e)}
            placeholder="Content"
            required
          />

          {index > 0 && (
            <button type="button" onClick={() => removeSyllabusEntry(index)}>
              Remove Week
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addSyllabusEntry}>
        Add Syllabus Week
      </button>

      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;
