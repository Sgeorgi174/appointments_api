import { CloseCircleFilled } from "@ant-design/icons";
import styles from "./ModalSettings.module.css";

export const ModalSettings = ({ isModalOpen, setIsModalOpen }) => {
  return (
    isModalOpen && (
      <div
        className={styles.modalOverlay}
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <div
          className={`${styles.modalContent} ${styles.slideInFwd}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div onClick={(e) => e.stopPropagation()} className={styles.closeBox}>
            <CloseCircleFilled
              onClick={() => setIsModalOpen(false)}
              className={styles.icon}
            />
          </div>
          <h2 className={styles.title}>Персонализация вашего бота</h2>
          <div className={styles.pointRow}>
            <p className={styles.text}>
              <span>1.</span>Выберете вашего бота в списках контактов. Нажмите
              <span>{" изм."}</span>
            </p>
            <img
              className={styles.image}
              src="/img/instruction/person_2.jpeg"
              alt=""
            />
          </div>
          <div className={styles.pointRow}>
            <p className={styles.text}>
              <span>2.</span>Тут вы можете изменить <span>имя</span> вашего
              бота, <span>описание</span> и <span>фото</span>.
            </p>
            <img
              className={styles.image}
              src="/img/instruction/person_1.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  );
};
