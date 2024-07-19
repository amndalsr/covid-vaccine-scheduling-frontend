import { useRef, useEffect } from "react";
import AppointmentsList from "../components/AppointmentsList/AppointmentsList";

const AppointmentsListPage = () => {
  const appointmentsListRef = useRef();

  useEffect(() => {
    if (appointmentsListRef.current) {
      appointmentsListRef.current.fetchAppointments();
    }
  }, []);

  return (
    <div>
      <h1>Lista de Agendamentos</h1>
      <AppointmentsList ref={appointmentsListRef} />
    </div>
  );
};

export default AppointmentsListPage;
