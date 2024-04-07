import iconWorks from "/icons/works.svg";
import iconTimer from "/icons/timer.svg";
import iconRuble from "/icons/ruble.svg";
import iconClose from "/icons/close.svg";
import styles from "./ServiceModal.module.css";
import { useEffect, useState } from "react";
import { editService } from "../../modules/api_requests";

export const ServiceModal = ({
  isOpen,
  handleClose,
  currentService,
  setIsModalOpen,
}) => {
  const [editedService, setEditedService] = useState(
    currentService || { name: "", duration: "", price: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    editService(editedService)
      .then(() => {
        setIsModalOpen(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    setEditedService(currentService);
  }, [currentService]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
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
        <h2 className={styles.modalTitle}>Редактирование услуги</h2>
        <div className={styles.row}>
          <img src={iconWorks} alt="works_icon" />
          <input
            type="text"
            value={editedService.name}
            className={styles.input}
            placeholder="Название услуги"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className={styles.row}>
          <img src={iconTimer} alt="works_icon" />
          <input
            type="number"
            value={editedService.duration}
            className={styles.input}
            placeholder="Продолжительность"
            onChange={handleChange}
            name="duration"
          />
        </div>
        <div className={styles.row}>
          <img src={iconRuble} alt="works_icon" />
          <input
            type="number"
            value={editedService.price}
            className={styles.input}
            placeholder="Цена"
            onChange={handleChange}
            name="price"
          />
        </div>
        <button onClick={handleEditClick} className={styles.button}>
          Сохранить
        </button>
      </div>
    </div>
  );
};
