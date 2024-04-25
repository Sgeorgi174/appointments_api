import { Link } from "react-router-dom";
import iconLogo from "/icons/header_icon.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.link}>
          <img className={styles.iconLogo} src={iconLogo}></img>
        </Link>
        <div className={styles.headerRight}>
          <Link
            onClick={() => {
              localStorage.removeItem("user");
            }}
            to="/login"
            className={styles.link}
          >
            <LogoutIcon sx={{ color: "#fff" }} />
          </Link>
        </div>
      </nav>
    </header>
  );
};
