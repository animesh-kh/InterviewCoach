import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <div className="footer-icon">📘</div>
          <h2>AI Interview Coach</h2>
        </div>

        <p className="footer-desc">
          Empowering candidates with an AI-driven interview preparation and
          real-time feedback platform.
        </p>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>

        <div className="footer-socials">
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} AI Interview Coach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
