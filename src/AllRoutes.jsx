import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import CourseForm from './pages/CourseForm/CourseForm';

const AllRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/AUTH' element={<Auth></Auth>}></Route>
    <Route path="/dashboard/:userId" element={<Dashboard />} />
    <Route path='/course-form/:userId' element={<CourseForm></CourseForm>} ></Route>
    

    
   
</Routes>
  )
}

export default AllRoutes
