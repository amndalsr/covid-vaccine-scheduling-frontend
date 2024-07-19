import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentsList from "../components/AppointmentsList/AppointmentsList";
import { ModalProvider } from "../context/ModalContext";
import api from "../services/api";

jest.mock("../services/api");

test("renders the AppointmentsList component with data", async () => {
  api.get.mockResolvedValueOnce({
    data: {
      groupedAppointments: {
        "2024-07-25 10:00": [
          {
            id: 1,
            name: "Amanda Laís",
            birthDate: "1980-05-01",
            appointmentDate: "2024-07-25",
            appointmentTime: "10:00",
            completed: false,
          },
        ],
      },
    },
  });

  render(
    <ModalProvider>
      <AppointmentsList />
    </ModalProvider>
  );

  expect(await screen.findByText(/Amanda Laís/i)).toBeInTheDocument();
  expect(screen.getByText(/1980-05-01/i)).toBeInTheDocument();
  expect(screen.getByText(/Aguardando/i)).toBeInTheDocument();
});

test("marks appointment as completed", async () => {
  api.get.mockResolvedValueOnce({
    data: {
      groupedAppointments: {
        "2024-07-25 10:00": [
          {
            id: 1,
            name: "Amanda Laís",
            birthDate: "1980-05-01",
            appointmentDate: "2024-07-25",
            appointmentTime: "10:00",
            completed: false,
          },
        ],
      },
    },
  });

  render(
    <ModalProvider>
      <AppointmentsList />
    </ModalProvider>
  );

  api.put.mockResolvedValueOnce({
    data: { message: "Appointment status updated successfully" },
  });

  fireEvent.click(await screen.findByText(/Marcar como Realizado/i));

  expect(api.put).toHaveBeenCalledWith("/appointments/1", { completed: true });

  api.get.mockResolvedValueOnce({
    data: {
      groupedAppointments: {
        "2024-07-25 10:00": [
          {
            id: 1,
            name: "Amanda Laís",
            birthDate: "1980-05-01",
            appointmentDate: "2024-07-25",
            appointmentTime: "10:00",
            completed: false,
          },
        ],
      },
    },
  });

  fireEvent.click(await screen.findByText(/Marcar como Realizado/i));

  expect(await screen.findByText(/Vacinado/i)).toBeInTheDocument();
});

test("deletes an appointment", async () => {
  api.get.mockResolvedValueOnce({
    data: {
      groupedAppointments: {
        "2024-07-25 10:00": [
          {
            id: 1,
            name: "Amanda Laís",
            birthDate: "1980-05-01",
            appointmentDate: "2024-07-25",
            appointmentTime: "10:00",
            completed: false,
          },
        ],
      },
    },
  });

  render(
    <ModalProvider>
      <AppointmentsList />
    </ModalProvider>
  );

  api.delete.mockResolvedValueOnce({
    data: { message: "Appointment deleted successfully" },
  });

  fireEvent.click(await screen.findByText(/Apagar/i));

  expect(api.delete).toHaveBeenCalledWith("/appointments/1");
});
