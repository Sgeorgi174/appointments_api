import Calendar from "../../components/calendar/Calendar";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";

export const Schedule = () => {
  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter="Г" />
      <Calendar />
    </Wrapper>
  );
};
