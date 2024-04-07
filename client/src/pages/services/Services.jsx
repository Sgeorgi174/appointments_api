import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { ServicesBox } from "../../components/servicesBox/ServicesBox";
import { getServices } from "../../modules/api_requests";
import { ServiceEditModal } from "../../components/serviceModule/ServiceEditModal";
import { useEffect, useState } from "react";
import iconAdd from "/icons/add.svg";
import styles from "./Services.module.css";
import { ServiceAddModal } from "../../components/serviceModule/ServiceAddModal";
import { ServiceConfirmModal } from "../../components/serviceModule/ServiceConfirm";

export const Services = () => {
  const [servicesData, setServicesData] = useState([
    { name: "", price: 0, time: 0 },
  ]);
  const [currentService, setCurrentService] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const deleteClick = (index) => {
    setCurrentService(servicesData[index]);
    setIsModalConfirmOpen(true);
  };

  const editClick = (index) => {
    setCurrentService(servicesData[index]);
    setIsModalEditOpen(true);
  };

  useEffect(() => {
    getServices().then((data) => {
      setServicesData(data);
    });
  }, [isModalEditOpen, isModalAddOpen, isModalConfirmOpen]);

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"Г"} />
      <div className={styles.titleBox}>
        <h2 className={styles.title}>Мои услуги</h2>
        <img
          onClick={() => setIsModalAddOpen(true)}
          className={styles.addButton}
          src={iconAdd}
        />
      </div>
      <div className={styles.serviceBox}>
        {servicesData.map((el, index) => {
          return (
            <ServicesBox
              key={index}
              name={el.name}
              price={el.price}
              time={el.duration}
              deleteClick={() => {
                deleteClick(index);
              }}
              editClick={() => {
                editClick(index);
              }}
            />
          );
        })}
      </div>
      <ServiceEditModal
        setIsModalOpen={setIsModalEditOpen}
        isOpen={isModalEditOpen}
        currentService={currentService}
      />
      <ServiceAddModal
        isOpen={isModalAddOpen}
        setIsModalOpen={setIsModalAddOpen}
      />
      <ServiceConfirmModal
        currentService={currentService}
        isOpen={isModalConfirmOpen}
        setIsModalOpen={setIsModalConfirmOpen}
      />
    </Wrapper>
  );
};
