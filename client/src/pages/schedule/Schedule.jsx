import { useEffect, useState } from "react";
import Calendar from "../../components/calendar/Calendar";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { getSchedule } from "../../modules/api_requests";
import { CreateCalendar } from "../../components/createCalendar/CreateCalendar";
import { Loader } from "../../components/loader/Loader";

const createdOrNot = async () => {
  const data = await getSchedule();
  if (data.length === 0) {
    // Здесь исправлено на data.length
    return false;
  }

  return data;
};

export const Schedule = () => {
  const [created, setCreated] = useState(false);
  const [userSchedule, setUserSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    createdOrNot().then((res) => {
      if (res) {
        setCreated(true);
        setUserSchedule(res);
        setIsLoading(false);
      } else {
        setCreated(false);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter="Г" />
      {isLoading ? (
        <Loader />
      ) : created ? (
        <Calendar data={userSchedule} />
      ) : (
        <CreateCalendar isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
    </Wrapper>
  );
};
