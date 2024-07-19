import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppointmentPage from "./pages/AppointmentPage";
import AppointmentsListPage from "./pages/AppointmentsListPage";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import { ModalProvider } from "./context/ModalContext";

const App = () => {
  const appointmentsListRef = useRef();

  const refreshAppointments = () => {
    if (appointmentsListRef.current) {
      appointmentsListRef.current.fetchAppointments();
    }
  };

  return (
    <ModalProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <AppointmentPage refreshAppointments={refreshAppointments} />
              }
            />
            <Route path="/appointments" element={<AppointmentsListPage />} />
          </Routes>
          <Modal />
        </div>
      </Router>
    </ModalProvider>
  );
};

App.displayName = "App";

export default App;
