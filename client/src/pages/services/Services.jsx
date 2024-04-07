import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./Services.module.css";

import { ServicesBox } from "../../components/servicesBox/ServicesBox";
import { useEffect, useState } from "react";
import { deleteService, getServices } from "../../modules/api_requests";

export const Services = () => {
  const [servicesData, setServicesData] = useState([
    { name: "", price: 0, time: 0 },
  ]);

  const deleteClick = (id) => {
    deleteService({ id });
    setServicesData(servicesData.filter((service) => service.id !== id));
  };

  useEffect(() => {
    getServices().then((data) => {
      setServicesData(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {});

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"Г"} />
      <h2 className={styles.title}>Мои услуги</h2>
      <div className={styles.servicesBox}>
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
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
