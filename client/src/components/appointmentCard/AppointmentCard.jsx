import styles from "./AppointmentCard.module.css";

export const AppointmentCard = ({
  name,
  relation,
  message,
  onDecline,
  date,
  appointmentInfo,
  onApprove,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.titleBox}>
        <p className={styles.title}>{name}</p>
        <p className={styles.title}>{date}</p>
      </div>
      <p className={styles.telnumber}>{relation}</p>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonRow}>
        {appointmentInfo.status === "confirmed" ? (
          <div className={styles.isConfirmed}>Подтверждено</div>
        ) : (
          <button className={styles.approve} onClick={onApprove}>
            Подтвердить
          </button>
        )}
        <button className={styles.decline} onClick={onDecline}>
          Отменить
        </button>
      </div>
    </div>
  );
};
