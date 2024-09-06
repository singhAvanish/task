const initialState = {
  data: null, 
  courses: [], 
  enrolledCourses: [] 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('Profile', JSON.stringify({ ...action.data }));
      return { ...state, data: action.data };
      
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, data: null, courses: [], enrolledCourses: [] };
    case 'ENROLL_COURSE':
     
      return {
        ...state,
        enrolledCourses: action.payload.enrolledCourses 
      };

    case 'CREATE_COURSE':
      
      return {
        ...state,
        courses: [...state.courses, action.payload] 
      };

    default:
      return state;
  }
};

export default authReducer;
