import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./HeaderAbout.css";

export default function HeaderAbout() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button onClick = {() => navigate(-1)} className="header-text">Back</button>
      <Link key = "HeaderAbout" to="/">
        <button className="header-text">Back to list</button>
      </Link>
    </div>
  );
}