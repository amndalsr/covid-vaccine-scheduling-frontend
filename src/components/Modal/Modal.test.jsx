import React from "react";
import { render, screen } from "@testing-library/react";
import Modal from "../components/Modal/Modal";
import { ModalProvider } from "../context/ModalContext";

test("renders the Modal component and shows content when open", () => {
  render(
    <ModalProvider>
      <Modal />
    </ModalProvider>
  );

  const { openModal } = React.useContext(ModalProvider);
  openModal("Teste de mensagem no modal");

  expect(screen.getByText(/Teste de mensagem no modal/i)).toBeInTheDocument();
});
