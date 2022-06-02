import { createPortal } from 'react-dom';

const Modal = ({ element, isOpen }) => {
  return isOpen ? createPortal(element, document.body) : null;
};

export default Modal;
