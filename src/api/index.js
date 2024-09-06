import axios from "axios";


const API = axios.create({ baseURL: 'http://localhost:4000' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    return req;
});




export const login = (authData) => API.post('/user/login', authData);


export const signUp = (authData) => API.post('/user/signup', authData);


export const getProfile = () => API.get('/user/profile');


export const getCourse = () => API.get('/');



export const enrollCourse = (courseId, userId) => API.post(`/courses/${userId}/enroll/${courseId}`);
export const getEnrolledCourses = (userId) => API.get(`/courses/enrolled/${userId}`);
export const postCourse =(userId,courseData)=>API.post(`/courses/${userId}`,courseData)

