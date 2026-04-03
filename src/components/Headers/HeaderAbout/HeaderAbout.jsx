import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./HeaderAbout.module.css";

export default function HeaderAbout() {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <button onClick = {() => navigate(-1)} className={styles.header_text}>Back</button>
      <Link key = "HeaderAbout" to="/">
        <button className={styles.header_text}>Back to list</button>
      </Link>
    </div>
  );
}