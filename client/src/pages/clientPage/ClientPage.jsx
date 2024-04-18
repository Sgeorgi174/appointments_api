import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputForAuth } from "../../components/inputForAuth/InputForAuth";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./ClientPage.module.css";
import { GradientButton } from "../../components/gradientButton/GradientButton";
import Calendar from "../../components/calendar/Calendar";
import {
  addAppointment,
  createOrGetClient,
  getCurrentSchedule,
  getCurrentServices,
} from "../../modules/api_requests";
import { Loader } from "../../components/loader/Loader";

const telegram = window.Telegram.WebApp;

export const ClientPage = () => {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    telNumber: "",
    telegramId: "",
    userId: "",
  });
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);
  const [servicesList, setServicesList] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState({
    service: {},
    client: {},
    date: "",
    time: 0,
  });
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceDuration, setServiceDuration] = useState(0);

  const { id } = useParams();
  telegram.expand();

  useEffect(() => {
    setIsLoading(true);
    getCurrentSchedule(id).then(async (schedule) => {
      setSchedule(schedule);
      await getCurrentServices(id)
        .then((servicesList) => {
          setServicesList(servicesList);
          setClientInfo({
            ...clientInfo,
            userId: id,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    });

    console.log(telegram.initDataUnsafe.user);

    // Get user id after expanding the Telegram object
    if (telegram.initDataUnsafe.user) {
      const telegramId = telegram.initDataUnsafe.user.id;
      console.log(telegramId);
      setClientInfo({
        ...clientInfo,
        telegramId,
      }); // Save user id in state
    }
  }, []);

  const handleCreateClientOnFirstStep = () => {
    console.log(clientInfo);
    createOrGetClient(clientInfo)
      .then((data) => {
        setAppointmentInfo({ ...appointmentInfo, client: data });
        setStep(2);
      })
      .catch(() => {
        return;
      });
    setStep(2);
  };

  const handleClickNextStep = (service) => {
    setServiceDuration(service.duration);
    setAppointmentInfo({ ...appointmentInfo, service });
    setStep(3);
  };

  const handleClickComplete = () => {
    setStep(4);
  };

  const handleCloseWindow = () => {
    addAppointment({
      userId: id,
      serviceId: appointmentInfo.service.id,
      clientId: appointmentInfo.client.id,
      date: appointmentInfo.date,
      time: appointmentInfo.time,
    })
      .then(() => {
        telegram.close();
      })
      .catch(() => {});
  };

  return (
    <Wrapper
      wrapperClass={
        step === 1 || step === 4
          ? "wrapperForMobile_step1"
          : step === 2
          ? "wrapperForMobile_auth"
          : "wrapperForMobile"
      }
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {step === 1 && (
            <div
              className={`${styles.contentBox} ${
                step !== 1 ? styles.hidden : ""
              }`}
            >
              <h1 className={styles.title}>Welcome</h1>
              <InputForAuth
                type="text"
                placeHolder={"Имя"}
                name={"name"}
                value={clientInfo.name}
                data={clientInfo}
                setData={setClientInfo}
                setIsError={setIsError}
              />
              <InputForAuth
                type="tel"
                placeHolder={"Номер телефона"}
                name={"telNumber"}
                value={clientInfo.telNumber}
                data={clientInfo}
                setData={setClientInfo}
                setIsError={setIsError}
              />
              <GradientButton
                buttonName={"Далее"}
                onClick={handleCreateClientOnFirstStep}
                isdDsabled={isError}
              />
            </div>
          )}
          {step === 2 && (
            <div
              className={`${styles.contentBoxService} ${
                step !== 2 ? styles.hidden : ""
              }`}
            >
              {servicesList.map((service) => {
                return (
                  <button
                    key={service.id}
                    onClick={() => handleClickNextStep(service)}
                    className={styles.serviceBox}
                  >
                    {service.name}
                  </button>
                );
              })}
              <button onClick={() => setStep(1)} className={styles.buttonBack}>
                <span>Назад</span>
              </button>
            </div>
          )}
          {step === 3 && (
            <>
              <Calendar
                appointmentInfo={appointmentInfo}
                setAppointmentInfo={setAppointmentInfo}
                serviceDuration={serviceDuration}
                isUser={false}
                data={schedule}
              />
              <div className={styles.completeButtonBox}>
                <GradientButton
                  buttonName={"Записаться"}
                  onClick={() => handleClickComplete()}
                />
              </div>
            </>
          )}
          {step === 4 && (
            <div className={styles.congratsBox}>
              <h1 className={styles.title}>Отлично!</h1>
              <div className={styles.completeButtonBox}>
                <GradientButton
                  buttonName={"OK"}
                  onClick={() => handleCloseWindow()}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};
