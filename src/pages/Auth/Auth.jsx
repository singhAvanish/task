
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "../../actions/auth";
import './Auth.css'; 
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      const userId = authData.result._id; 
      if (userId) {
        navigate('/'); 
      }
    }
  }, [authData, navigate]);

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setRole("student"); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
    } else if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      } else {
        dispatch(signup({ name, email, password, role }, navigate));
      }
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    console.log('Before clearing:', localStorage.getItem('authToken'));
    
    
    localStorage.removeItem('authToken');
    
    console.log('After clearing:', localStorage.getItem('authToken'));
    window.location.href = '/';
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img alt="" className="login-logo" />
        {authData ? (
          <div>
            <h4>Welcome, {authData.result.name}</h4>
            <button className="auth-btn" onClick={handleLogout} >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <label htmlFor="name">
                  <h4>Display Name</h4>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

               
                <label htmlFor="role">
                  <h4>Select Role</h4>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </label>
              </>
            )}

            <label htmlFor="email">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="password">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Password</h4>
                {!isSignup && (
                  <p style={{ color: "#007ac6", fontSize: "13px" }}>
                    <Link to="/forgot-password">Forgot password</Link>
                  </p>
                )}
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button type="submit" className="auth-btn">
              {isSignup ? "Sign up" : "Log in"}
            </button>
          </form>
        )}

        {!authData && (
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              className="handle-switch-btn"
              onClick={handleSwitch}
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        )}
      </div>
    </section>
  );
};

export default Auth;
