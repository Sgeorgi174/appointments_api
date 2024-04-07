import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { ServicesBox } from "../../components/servicesBox/ServicesBox";
import { useEffect, useState } from "react";
import { deleteService, getServices } from "../../modules/api_requests";
import { ServiceModal } from "../../components/serviceModule/ServiceModal";
import styles from "./Services.module.css";

export const Services = () => {
  const [servicesData, setServicesData] = useState([
    { name: "", price: 0, time: 0 },
  ]);
  const [currentService, setCurrentService] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteClick = (id) => {
    deleteService({ id });
    setServicesData(servicesData.filter((service) => service.id !== id));
  };

  const editClick = (index) => {
    setCurrentService(servicesData[index]);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getServices().then((data) => {
      setServicesData(data);
    });
  }, [isModalOpen]);

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"Г"} />
      <h2 className={styles.title}>Мои услуги</h2>
      <div className={styles.serviceBox}>
        {servicesData.map((el, index) => {
          return (
            <ServicesBox
              key={index}
              name={el.name}
              price={el.price}
              time={el.duration}
              deleteClick={() => {
                deleteClick(el.id);
              }}
              editClick={() => {
                editClick(index);
              }}
            />
          );
        })}
      </div>
      <ServiceModal
        setIsModalOpen={setIsModalOpen}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        currentService={currentService}
      />
    </Wrapper>
  );
};
