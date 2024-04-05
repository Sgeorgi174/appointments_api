import { useEffect, useState } from "react";
import Calendar from "../../components/calendar/Calendar";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { getSchedule } from "../../modules/api_requests";

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

  useEffect(() => {
    createdOrNot().then((res) => {
      if (res) {
        setCreated(true);
        setUserSchedule(res);
      } else {
        setCreated(false);
      }
    });
  }, []);

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter="Г" />
      {created ? <Calendar data={userSchedule} /> : null}
    </Wrapper>
  );
};
