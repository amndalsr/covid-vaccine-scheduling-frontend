import { render, screen } from "@testing-library/react";
import Banner from "../components/Banner/Banner";

test("renders the Banner component", () => {
  render(<Banner />);

  expect(
    screen.getByText(/Sistema de Agendamento de Vacinação COVID-19/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /Por favor, preencha o formulário abaixo para agendar sua vacinação./i
    )
  ).toBeInTheDocument();
});
