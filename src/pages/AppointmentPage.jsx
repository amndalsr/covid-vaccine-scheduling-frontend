import PropTypes from "prop-types";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import Banner from "../components/Banner/Banner";

const AppointmentPage = ({ refreshAppointments }) => {
  return (
    <div>
      <Banner />
      <h1>Agendar Vacinação</h1>
      <AppointmentForm refreshAppointments={refreshAppointments} />
    </div>
  );
};

AppointmentPage.propTypes = {
  refreshAppointments: PropTypes.func.isRequired,
};

export default AppointmentPage;
