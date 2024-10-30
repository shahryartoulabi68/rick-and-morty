import { XCircleIcon } from "@heroicons/react/24/outline"
function Modal({ title, children, onOpen, open }) {
    if (!open) return null
    return (
        <div>
            <div className="backdrop" onClick={() => onOpen(false)}></div>
            <div className="modal">
                <div className="modal__header">
                    <div className="title">{title}</div>
                    <button>
                        <XCircleIcon className="icon close" onClick={() => onOpen(false)} />
                    </button>
                </div>
                {children}
            </div>


        </div>
    )
}

export default Modal
