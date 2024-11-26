const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">
                    Bạn có chắc chắn muốn xóa không?
                </h2>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmDelete;
