import React from "react";
import ReactModal from "react-modal";
import Close from "../img/Close.svg";
import "../components/scss/modal.scss";

ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      className="modal"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Modal</h2>
          <button className="modal-close" onClick={onRequestClose}>
            <img src={Close} alt="" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
