import iconClose from "/icons/close.svg";
import styles from "./ServiceModal.module.css";
import { deleteService } from "../../modules/api_requests";

export const ServiceConfirmModal = ({
  isOpen,
  setIsModalOpen,
  currentService,
}) => {
  if (!isOpen) return null;

  const handleDeleteClick = (currentService) => {
    const id = currentService.id;
    deleteService({ id }).then(() => {
      setIsModalOpen(false);
    });
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div onClick={(e) => e.stopPropagation()} className={styles.closeBox}>
          <img
            onClick={() => {
              setIsModalOpen(false);
            }}
            src={iconClose}
            alt=""
          />
        </div>
        <h2 className={styles.modalTitle}>Подтверждение</h2>
        <p className={styles.confirmText}>
          Вы действительно хотите удалить услугу?
        </p>
        <div className={styles.rowButton}>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className={styles.button}
          >
            Отмена
          </button>
          <button
            onClick={() => {
              handleDeleteClick(currentService);
            }}
            className={styles.button}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
