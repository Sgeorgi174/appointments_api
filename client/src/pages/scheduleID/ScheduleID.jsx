import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentSchedule } from "../../modules/api_requests";
import Calendar from "../../components/calendar/Calendar";
import { Loader } from "../../components/loader/Loader";
import { Wrapper } from "../../components/wrapper/Wrapper";
export function ScheduleID() {
  const { id } = useParams();
  const [userSchedule, setUserSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCurrentSchedule(id)
      .then((data) => {
        setUserSchedule(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);
  return (
    <Wrapper wrapperClass={"wrapperForMobile_auth"}>
      {isLoading ? <Loader /> : <Calendar data={userSchedule} />}
    </Wrapper>
  );
}
