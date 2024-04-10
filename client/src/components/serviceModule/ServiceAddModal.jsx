import iconWorks from "/icons/works.svg";
import iconTimer from "/icons/timer.svg";
import iconRuble from "/icons/ruble.svg";
import iconClose from "/icons/close.svg";
import styles from "./ServiceModal.module.css";
import { useEffect, useState } from "react";
import { addService } from "../../modules/api_requests";

export const ServiceAddModal = ({ isOpen, setIsModalOpen }) => {
  const [newService, setNewService] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {});

  const handleAddClick = () => {
    addService(newService)
      .then(() => {
        setNewService({
          name: "",
          duration: "",
          price: "",
        });
        setIsModalOpen(false);
      })
      .catch(() => {});
  };

  if (!isOpen) return null;

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
        <h2 className={styles.modalTitle}>Добавить услугу</h2>
        <div className={styles.row}>
          <img src={iconWorks} alt="works_icon" />
          <input
            type="text"
            value={newService.name}
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
            value={newService.duration}
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
            value={newService.price}
            className={styles.input}
            placeholder="Цена"
            onChange={handleChange}
            name="price"
          />
        </div>
        <button onClick={handleAddClick} className={styles.button}>
          Сохранить
        </button>
      </div>
    </div>
  );
};
