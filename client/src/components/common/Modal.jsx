import "./Modal.css";
import Button from "./Button";

/**
 * Confirmation Modal component.
 * Used primarily for delete confirmations.
 *
 * Props:
 *   isOpen     — controls visibility
 *   title      — modal title
 *   message    — confirmation message
 *   onConfirm  — callback for confirm action
 *   onCancel   — callback for cancel / close
 *   confirmText — text for confirm button (default: "Delete")
 *   loading    — loading state for confirm button
 */
const Modal = ({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
        </div>
        <div className="modal__body">
          <p className="modal__message">{message}</p>
        </div>
        <div className="modal__footer">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
