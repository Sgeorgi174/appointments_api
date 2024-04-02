import { Link } from "react-router-dom";
import iconLogo from "/icons/header_icon.svg";
import iconLogout from "/icons/logout.svg";
import styles from "./Header.module.css";

export const Header = ({ firstLetter }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.link}>
          <img className={styles.iconLogo} src={iconLogo}></img>
        </Link>
        <div className={styles.headerRight}>
          <div className={styles.avatar}>
            <p className={styles.avatarText}>{firstLetter}</p>
          </div>
          <Link className={styles.link}>
            <img
              className={styles.iconLogout}
              src={iconLogout}
              alt="icon_logout"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};
