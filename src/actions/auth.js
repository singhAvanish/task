import * as api from '../api';
import { setCurrentUser } from './currentUser';


export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: 'AUTH', data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    navigate('/AUTH');
  } catch (error) {
    console.log(error);
  }
};


export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    dispatch({ type: 'AUTH', data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    navigate(`/dashboard/${data.result._id}`); 
  } catch (error) {
    console.log(error);
  }
};



export const logout = () => async (dispatch,navigate) => {
  try {
    localStorage.removeItem('Profile');
    dispatch({ type: 'LOGOUT' });
    navigate('/')
  } catch (error) {
    console.error('Logout failed:', error);
  }
};


export const enrollCourse = (courseId, userId) => async (dispatch) => {
  try {
    const { data } = await api.enrollCourse(courseId, userId);
    dispatch({ type: 'ENROLL_COURSE', payload: data });
    alert('Successfully enrolled in the course!');
  } catch (error) {
    console.error('Error enrolling in course:', error);
    alert('Failed to enroll in the course. Please try again.');
  }
};


export const fetchEnrolledCourses = (userId) => async (dispatch) => {
  console.log('Dispatching fetchEnrolledCourses with userId:', userId);
  try {
    const { data } = await api.getEnrolledCourses(userId);
    dispatch({type:'ENROLL_COURSE',payload:data})
    console.log('Data fetched from API:', data);
    return data; 
  } catch (error) {
    console.error('Error fetching enrolled courses:', error.message);
    throw error;
  }
};





export const fetchHomeCourses = () => async (dispatch) => {
  try {
    const { data } = await api.getCourse();
    dispatch({ type: 'HOME', payload: data });
  } catch (error) {
    console.error('Error fetching home courses:', error);
  }
};
export const createCourse = (userId, courseData) => async (dispatch) => {
  try {
   
    const { data } = await api.postCourse(userId, courseData);
    
    console.log(data);
    
    dispatch({ type: 'CREATE_COURSE', payload: data });
    
    console.log('Course created successfully:', data);
  } catch (error) {
    console.error('Error creating course:', error.message);
  }
};
