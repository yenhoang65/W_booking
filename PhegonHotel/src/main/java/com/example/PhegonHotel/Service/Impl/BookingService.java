package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.BookingDTO;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.Booking;
import com.example.PhegonHotel.Entity.Hotel;
import com.example.PhegonHotel.Entity.Room;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Repository.BookingRepo;
import com.example.PhegonHotel.Repository.HotelRepo;
import com.example.PhegonHotel.Repository.RoomRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.Interface.IBookingService;
import com.example.PhegonHotel.Service.Interface.IRoomService;
import com.example.PhegonHotel.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.PhegonHotel.Utils.Utils.mapBookingEntityToBookingDTO;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private IRoomService roomService;
    @Autowired
    private RoomRepo roomRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private HotelRepo hotelRepo;

    @Override
    public ResponseDTO saveBooking(Long roomId, Long userId,Long hotelId, Booking bookingRequest) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
                throw new IllegalArgumentException("Ngày nhận phòng phải trước ngày trả phòng");
            }
            Room room = roomRepo.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            User user = userRepo.findById(userId).orElseThrow(() -> new OurException("User Not Found"));
            Hotel hotel = hotelRepo.findById(hotelId).orElseThrow(() -> new OurException("hotel Not Found"));
            List<Booking> existingBookings = room.getBookings();

            if (!roomIsAvailable(bookingRequest, existingBookings)) {
                throw new OurException("Phòng không có sẵn vào những ngày đã chọn");
            }

            // Tính toán giá phòng dựa trên số ngày đặt
            BigDecimal totalPrice = calculatePrice(room, bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate());

            bookingRequest.setTotalPrice(totalPrice); // Đặt giá phòng vào booking

            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            bookingRequest.setHotel(hotel);
            bookingRequest.setTotalPrice(totalPrice); // Đảm bảo giá tiền đã được gán
            String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepo.save(bookingRequest);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Thành Công");
            responseDTO.setBookingConfirmationCode(bookingConfirmationCode);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Lỗi đặt phòng: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO findBookingByConfirmationCode(String confirmationCode) {

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Booking booking = bookingRepo.findByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new OurException("Booking Not Found"));
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRooms(booking, true);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Thành Công");
            responseDTO.setBooking(bookingDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Lỗi khi tìm đặt phòng: " + e.getMessage());

        }
        return responseDTO;
    }


    public BigDecimal calculatePrice(Room room, LocalDate checkInDate, LocalDate checkOutDate) {
        long numberOfDays = ChronoUnit.DAYS.between(checkInDate, checkOutDate);

        if (numberOfDays <= 0) {
            throw new IllegalArgumentException("Ngày trả phòng phải sau ngày nhận phòng");
        }

        BigDecimal roomPrice = room.getRoomPrice();
        BigDecimal totalPrice = roomPrice;

        if (numberOfDays > 1) {
            for (int i = 1; i < numberOfDays; i++) {
                BigDecimal additionalPrice = roomPrice.multiply(BigDecimal.valueOf(0.1)); // Tăng 10% cho mỗi ngày thêm
                totalPrice = totalPrice.add(additionalPrice);//10% cho mỗi ngày thêm
            }
        }

        return totalPrice.setScale(2, RoundingMode.HALF_UP); // Làm tròn để có 2 chữ số thập phân
    }


    @Override
    public ResponseDTO getAllBookings() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Lấy thông tin người dùng hiện tại từ SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Lấy tất cả các khách sạn mà người dùng (vendor) đã tạo
            List<Hotel> hotelList = hotelRepo.findByCreatorId(currentUser.getId());

            // Lấy danh sách tất cả các booking thuộc các khách sạn đó
            List<Long> hotelIds = hotelList.stream().map(Hotel::getId).toList();
            List<Booking> bookingList = bookingRepo.findByHotelIdIn(hotelIds);

            // Chuyển đổi danh sách booking thành DTO
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Bookings retrieved successfully");
            responseDTO.setBookingList(bookingDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving bookings: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO cancelBooking(Long bookingId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            bookingRepo.findById(bookingId).orElseThrow(() -> new OurException("Đặt phòng không tồn tại"));
            bookingRepo.deleteById(bookingId);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Thành Công");

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Lỗi hủy đặt phòng: " + e.getMessage());

        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getBookingDetailById(Long bookingId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Tìm booking theo ID
            Booking booking = bookingRepo.findById(bookingId)
                    .orElseThrow(() -> new OurException("Booking not found with ID: " + bookingId));

            // Map booking sang BookingDTO
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTO(booking);

            // Cập nhật thông tin thành công
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Booking details retrieved successfully");
            responseDTO.setBooking(bookingDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving booking details: " + e.getMessage());
        }

        return responseDTO;
    }


    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {

        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public ResponseDTO getBookingsByUser() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Lấy thông tin người dùng hiện tại từ SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Lấy thông tin người dùng từ database
            User currentUser = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new OurException("Người dùng không tồn tại"));

            // Lấy danh sách các đơn đặt phòng thuộc về người dùng này
            List<Booking> userBookings = bookingRepo.findByUserId(currentUser.getId());

            // Chuyển đổi danh sách Booking sang BookingDTO
            List<BookingDTO> bookingDTOList = userBookings.stream()
                    .map(Utils::mapBookingEntityToBookingDTO)
                    .collect(Collectors.toList());

            // Trả kết quả
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Danh sách đặt phòng đã được lấy thành công");
            responseDTO.setBookingList(bookingDTOList);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Lỗi khi lấy danh sách đặt phòng: " + e.getMessage());
        }

        return responseDTO;
    }

}
