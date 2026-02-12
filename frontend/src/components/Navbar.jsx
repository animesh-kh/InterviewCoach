import { Link, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               
    navigate("/login");    
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <FaRobot className="logo-icon" />
          <span className="logo-text">AI Interview Coach</span>
        </Link>

        <Link to="/" className="nav-link">Home</Link>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>

            <Link to="/register" className="signup-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="user-email">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="signup-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;






// import { Link, useNavigate } from "react-router-dom";
// import { FaRobot } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import "./Navbar.css";

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem("authToken");
//       setIsLoggedIn(!!token);
//     };

//     checkLogin();
//     window.addEventListener("storage", checkLogin);

//     return () => {
//       window.removeEventListener("storage", checkLogin);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/" className="logo">
//           <FaRobot className="logo-icon" />
//           <span className="logo-text">Interview Coach</span>
//         </Link>

//         <Link to="/" className="nav-link">Home</Link>
//       </div>

//       <div className="nav-right">
//         {!isLoggedIn ? (
//           <>
//             <Link to="/login" className="login-link">Login</Link>
//             <Link to="/register" className="signup-btn">Sign Up</Link>
//           </>
//         ) : (
//           <button onClick={handleLogout} className="signup-btn">
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
