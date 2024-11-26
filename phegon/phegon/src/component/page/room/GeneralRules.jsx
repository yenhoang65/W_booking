import { CiLogout } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { MdFamilyRestroom, MdOutlinePets } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";

function GeneralRules() {
    return (
        <>
            <div>
                <h3 className="font-[700] text-[25px]">General Rules</h3>
            </div>
            <div className="border border-[#333] mt-7">
                <div className="border-b border-[#333] py-5  grid grid-cols-12">
                    <div className="col-span-4">
                        <p className="ml-7 flex gap-3 font-[600]">
                            <IoIosLogOut className="mt-1 " />
                            Nhận phòng
                        </p>
                    </div>
                    <div className="col-span-8">
                        <p>Từ 14:00</p>
                    </div>
                </div>
                <div className="border-b border-[#333] py-5  grid grid-cols-12">
                    <div className="col-span-4">
                        <p className="ml-7 flex gap-3 font-[600]">
                            <CiLogout className="mt-1" />
                            Trả phòng
                        </p>
                    </div>
                    <div className="col-span-8">
                        <p>Từ 12:00</p>
                    </div>
                </div>
                <div className="border-b border-[#333] py-5  grid grid-cols-12">
                    <div className="col-span-4">
                        <p className="ml-7 flex gap-3 font-[600]">
                            <PiWarningCircleLight className="mt-1" />
                            Hủy đặt phòng/ Trả trước
                        </p>
                    </div>
                    <div className="col-span-8">
                        <p>
                            Các chính sách hủy và thanh toán trước sẽ khác nhau
                            tùy vào từng loại chỗ nghỉ. <br /> Vui lòng kiểm tra
                            các điều kiện có thể được áp dụng cho mỗi lựa chọn
                            của bạn.
                        </p>
                    </div>
                </div>
                <div className="border-b border-[#333] py-5  grid grid-cols-12">
                    <div className="col-span-4">
                        <p className="ml-7 flex gap-3 font-[600]">
                            <MdFamilyRestroom className="mt-1" />
                            Trẻ em và giường
                        </p>
                    </div>
                    <div className="col-span-8">
                        <h3 className="font-[600]">Chính sách trẻ em</h3>
                        <p className="mt-3">Phù hợp cho tất cả trẻ em.</p>
                        <p className="mt-3">
                            Trẻ em từ 18 tuổi trở lên sẽ được tính giá như người
                            lớn tại chỗ nghỉ này.
                        </p>
                        <p className="mt-3">
                            Để xem thông tin giá và tình trạng phòng trống chính
                            xác, vui lòng thêm số <br /> lượng và độ tuổi của
                            trẻ em trong nhóm của bạn khi tìm kiếm.
                        </p>
                        <h3 className="font-[600] mt-4">
                            Chính sách nôi (cũi) và giường phụ
                        </h3>
                        <p className="mt-3">0 - 2 tuổi</p>
                        <p className="mt-3">
                            Có nôi, cũi nếu yêu cầu:{" "}
                            <strong className="text-[#588157] ml-10">
                                Miễn phí
                            </strong>
                        </p>
                    </div>
                </div>
                <div className="border-b border-[#333] py-5  grid grid-cols-12">
                    <div className="col-span-4">
                        <p className="ml-7 flex gap-3 font-[600]">
                            <GoPeople className="mt-1" />
                            Giới hạn độ tuổi
                        </p>
                    </div>
                    <div className="col-span-8">
                        <p>Tối thiểu 18 tuổi mới được nhận phòng</p>
                    </div>
                </div>
                <div className="border-b py-5  grid grid-cols-12">
                    <div className="col-span-4">
                        <p className="ml-7 flex gap-3 font-[600]">
                            <MdOutlinePets className="mt-1" />
                            Vật nuôi
                        </p>
                    </div>
                    <div className="col-span-8">
                        <p>Không được mang vật nuôi vào</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GeneralRules;
