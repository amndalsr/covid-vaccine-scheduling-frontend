import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

test("renders the Navbar component", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText(/Agendar/i)).toBeInTheDocument();
  expect(screen.getByText(/Agendamentos/i)).toBeInTheDocument();
});
