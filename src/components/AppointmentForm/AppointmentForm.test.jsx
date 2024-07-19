import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import { ModalProvider } from "../context/ModalContext";
import api from "../services/api";

jest.mock("../services/api");

test("renders the AppointmentForm and submits successfully", async () => {
  const mockRefreshAppointments = jest.fn();
  render(
    <ModalProvider>
      <AppointmentForm refreshAppointments={mockRefreshAppointments} />
    </ModalProvider>
  );

  expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data do Agendamento/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Hora do Agendamento/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Nome/i), {
    target: { value: "Test Name" },
  });
  fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), {
    target: { value: "2024-07-01" },
  });
  fireEvent.change(screen.getByLabelText(/Hora do Agendamento/i), {
    target: { value: "10:00" },
  });

  api.post.mockResolvedValueOnce({
    data: { message: "Appointment created successfully" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Agendar/i }));

  expect(mockRefreshAppointments).toHaveBeenCalled();
});

test("shows validation errors when required fields are missing", () => {
  const mockRefreshAppointments = jest.fn();
  render(
    <ModalProvider>
      <AppointmentForm refreshAppointments={mockRefreshAppointments} />
    </ModalProvider>
  );

  fireEvent.submit(screen.getByRole("button", { name: /Agendar/i }));

  expect(
    screen.getByText(/Nome é necessário para agendamento/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Data de nascimento é necessária para agendamento/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Informe a data para agendamento/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Informe a hora para agendamento/i)
  ).toBeInTheDocument();
});

test("displays error message from API when submission fails", async () => {
  const mockRefreshAppointments = jest.fn();
  render(
    <ModalProvider>
      <AppointmentForm refreshAppointments={mockRefreshAppointments} />
    </ModalProvider>
  );

  fireEvent.change(screen.getByLabelText(/Nome/i), {
    target: { value: "Test Name" },
  });
  fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), {
    target: { value: "2024-07-01" },
  });
  fireEvent.change(screen.getByLabelText(/Hora do Agendamento/i), {
    target: { value: "10:00" },
  });

  api.post.mockRejectedValueOnce({
    response: {
      data: { message: "No more appointments available for this date" },
    },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Agendar/i }));

  expect(
    await screen.findByText(/No more appointments available for this date/i)
  ).toBeInTheDocument();
});
