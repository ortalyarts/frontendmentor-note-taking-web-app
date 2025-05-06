import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, open, children }) {
  const dialog = useRef();
  const [mounted, setMounted] = useState(false); // Track component mount state

  useEffect(() => {
    setMounted(true); // Set to true once component is mounted
  }, []);

  useEffect(() => {
    if (open && dialog.current) {
      dialog.current.showModal();
    } else if (dialog.current) {
      dialog.current.close();
    }
  }, [open]);

  if (!mounted) return null; // Prevents SSR issues

  return mounted
    ? createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}>
          {open ? children : null}
        </dialog>,
        document.getElementById("modal") // Runs only after component mounts
      )
    : null;
}
