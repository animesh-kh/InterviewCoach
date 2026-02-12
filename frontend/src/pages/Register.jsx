import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isRegistered", "true");
    localStorage.setItem("registeredEmail", email);
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-sub">
          Join AI Interview Coach today
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Register →
          </button>
        </form>

        <p className="switch-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Registration successful!");
//     navigate("/login");
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h2>Create Account</h2>
//         <p className="auth-sub">
//           Join AI Interview Coach today
//         </p>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <label>Email Address</label>
//           <input
//             type="email"
//             placeholder="name@company.com"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="••••••••"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button type="submit" className="auth-btn">
//             Register →
//           </button>
//         </form>

//         <p className="switch-link">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")}>
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;
