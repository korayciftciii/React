import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ children, open }) {
    const dialog = useRef()
    useEffect(() => {
        const dialogElement = dialog.current
        if (open) {
            dialogElement.showModal()
        } else {
            dialogElement.close()
        }
    }, [open])
    return (
        createPortal(
            <dialog ref={dialog}
                className="modal-box">
                {children}
            </dialog>,
            document.getElementById("modal"))
    )
}