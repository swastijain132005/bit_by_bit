import "./Navbar.css";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-inner" onClick={() => navigate("/")}>
        {/* Logo */}
        <div className="logo">
          <Shield size={20} />
          <span>
            Safe<span className="red">Route</span>
          </span>
        </div>

        {/* Links */}
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/signup">Sign Up</a>
          <a href="/planner">Plan a Route</a>
          <a href="/ratings">Rate a Route</a>
          
        </div>

        {/* CTA */}
      </div>
    </nav>
  );
}
