import { useEffect, useState } from "react";
import Calendar from "../../components/calendar/Calendar";
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
  const [isLoading, setIsLoading] = useState(false);
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
    <>
      {isLoading ? (
        <Loader />
      ) : created ? (
        <Calendar isUser={true} data={userSchedule} />
      ) : (
        <CreateCalendar setCreated={setCreated} setIsLoading={setIsLoading} />
      )}
    </>
  );
};
