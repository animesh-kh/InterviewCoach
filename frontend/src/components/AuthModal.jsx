import "./AuthModal.css";

function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <signup />
  );
}

export default AuthModal;
