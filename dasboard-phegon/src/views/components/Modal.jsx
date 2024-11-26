import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 z-100 flex items-center justify-center">
            <div className="bg-[#FFF9E5] rounded-lg p-6 w-[80%] max-w-[600px] relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-red-700 p-1 rounded-full text-[#FFF] hover:text-gray-700"
                >
                    <FaTimes size={20} />
                </button>
                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
