
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data); 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li><Link to={`/dashboard/${user.result._id}`}>Dashboard</Link></li>
           
            {user.result.role === 'instructor' && (
              <li><Link to={`/course-form/${user.result._id}`}>Create Course</Link></li>
            )}
            <li><button onClick={handleLogout}>Logout</button></li>
            <li><Link to='/'>Home</Link></li>
          </>
        ) : (
          <li><Link to="/AUTH">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
