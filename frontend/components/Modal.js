export default function Modal({ title, children, onClose }) {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close">
          ×
        </button>
        <img className="modalLogo" src="/images/bird.svg" alt="logo" />
        <h2 className="modalTitle">{title}</h2>
        {children}
      </div>
    </div>
  );
}
