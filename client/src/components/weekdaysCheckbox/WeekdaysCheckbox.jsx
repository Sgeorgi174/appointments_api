import styles from "./WeekdaysCheckbox.module.css";

const WeekdaysCheckbox = ({ selectedDays, handleChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="monday"
          checked={selectedDays.includes("1")}
          onChange={handleChange}
        />
        ПН
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="tuesday"
          checked={selectedDays.includes("2")}
          onChange={handleChange}
        />
        ВТ
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="wednesday"
          checked={selectedDays.includes("3")}
          onChange={handleChange}
        />
        СР
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="thursday"
          checked={selectedDays.includes("4")}
          onChange={handleChange}
        />
        ЧТ
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="friday"
          checked={selectedDays.includes("5")}
          onChange={handleChange}
        />
        ПТ
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="saturday"
          checked={selectedDays.includes("6")}
          onChange={handleChange}
        />
        СБ
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="sunday"
          checked={selectedDays.includes("0")}
          onChange={handleChange}
        />
        ВС
      </label>
    </div>
  );
};

export default WeekdaysCheckbox;
