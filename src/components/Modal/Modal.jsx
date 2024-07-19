import { useContext, useEffect } from "react";
import ModalContext from "../../context/ModalContext";
import "./Modal.css";

const Modal = () => {
  const { isModalOpen, modalContent, closeModal } = useContext(ModalContext);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <p>{modalContent}</p>
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

export default Modal;
