import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import api from "../../services/api";
import { format, parseISO, isValid, parse } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "./AppointmentsList.css";

const AppointmentsList = forwardRef((props, ref) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      const groupedAppointments = response.data.groupedAppointments;
      console.log("Fetched Appointments:", groupedAppointments);
      setAppointments(groupedAppointments);
      localStorage.setItem("appointments", JSON.stringify(groupedAppointments));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    try {
      const storedAppointments = localStorage.getItem("appointments");
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        setAppointments(parsedAppointments);
      } else {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error parsing appointments from localStorage:", error);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    fetchAppointments,
  }));

  const toggleCompletion = async (appointment) => {
    try {
      await api.put(`/appointments/${appointment.id}`, {
        completed: !appointment.completed,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const formatDate = (dateString, timeString) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) throw new Error("Invalid date");
      const time = timeString ? parse(timeString, "HH:mm", new Date()) : null;
      return time
        ? format(date, "dd/MM/yyyy", { locale: ptBR }) +
            " " +
            format(time, "HH:mm", { locale: ptBR })
        : format(date, "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const getSortedAppointments = () => {
    let appointmentArray = [];
    for (const [key, value] of Object.entries(appointments)) {
      appointmentArray = [
        ...appointmentArray,
        ...value.map((appointment) => ({
          ...appointment,
          key,
        })),
      ];
    }

    appointmentArray.sort((a, b) => {
      const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
      const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
      return dateA - dateB;
    });

    const sortedAppointments = appointmentArray.reduce((acc, appointment) => {
      if (!acc[appointment.key]) {
        acc[appointment.key] = [];
      }
      acc[appointment.key].push(appointment);
      return acc;
    }, {});

    return sortedAppointments;
  };

  const sortedAppointments = getSortedAppointments();

  return (
    <div className="appointments-list">
      {Object.keys(sortedAppointments).map((key) => {
        const [dateString, timeString] = key.split(" ");
        return (
          <div key={key}>
            <div className="appointment-card">
              <h3>
                <strong>Data e hora da vacinação: </strong>
                {formatDate(dateString, timeString)}
              </h3>
              {sortedAppointments[key].map((appointment) => (
                <div key={appointment.id} className="appointment-info">
                  <div>
                    <p>
                      <strong>Nome:</strong> {appointment.name}
                    </p>
                    <p>
                      <strong>Data de nascimento:</strong>{" "}
                      {formatDate(appointment.birthDate)}
                    </p>
                    <p>
                      <strong>Situação:</strong>{" "}
                      {appointment.completed ? "Vacinado" : "Aguardando"}
                    </p>
                  </div>
                  <div className="appointment-buttons">
                    <button
                      onClick={() => toggleCompletion(appointment)}
                      style={{
                        backgroundColor: appointment.completed
                          ? "green"
                          : "red",
                        color: "white",
                      }}
                    >
                      {appointment.completed
                        ? "Desmarcar"
                        : "Marcar como Realizado"}
                    </button>
                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});

AppointmentsList.displayName = "AppointmentsList";

export default AppointmentsList;
