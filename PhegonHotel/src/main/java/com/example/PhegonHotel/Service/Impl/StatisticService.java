package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.Hotel;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Repository.BookingRepo;
import com.example.PhegonHotel.Repository.HotelRepo;
import com.example.PhegonHotel.Repository.RoomRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.Interface.IStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.example.PhegonHotel.Entity.Booking;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticService implements IStatisticService {

    @Autowired
    private HotelRepo hotelRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private UserRepo userRepo;

//    @Override
//    public ResponseDTO getDashboardDataForUser() {
//        ResponseDTO responseDTO = new ResponseDTO();
//
//        try {
//            // Lấy thông tin tài khoản người dùng hiện tại từ SecurityContext
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            String username = userDetails.getUsername();
//
//            // Tìm user theo username
//            User currentUser = userRepo.findByUsername(username)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            // Lấy tất cả khách sạn mà user hiện tại đã tạo
//            List<Hotel> userHotels = hotelRepo.findByCreatorId(currentUser.getId());
//            List<Long> hotelIds = userHotels.stream().map(Hotel::getId).toList();
//
//            // Lấy ngày hôm nay và tháng hiện tại
//            LocalDate today = LocalDate.now();
//            LocalDate startOfMonth = today.withDayOfMonth(1);
//            LocalDate endOfMonth = today.withDayOfMonth(today.lengthOfMonth());
//
//            // Tổng số khách sạn và phòng
//            long totalHotels = userHotels.size();
//            long totalRooms = roomRepo.countByHotelIdIn(hotelIds);
//
//            // Thống kê số phòng thuê/chưa thuê theo khách sạn
//            Map<Long, Map<String, Long>> roomStatistics = userHotels.stream().collect(Collectors.toMap(
//                    Hotel::getId,
//                    hotel -> {
//                        long totalRoomsInHotel = roomRepo.countByHotelId(hotel.getId());
//                        long bookedRoomsToday = bookingRepo.findByHotelIdAndCheckInDate(hotel.getId(), today)
//                                .stream().map(booking -> booking.getRoom().getId()).distinct().count();
//                        long availableRooms = totalRoomsInHotel - bookedRoomsToday;
//
//                        return Map.of(
//                                "totalRooms", totalRoomsInHotel,
//                                "bookedRooms", bookedRoomsToday,
//                                "availableRooms", availableRooms
//                        );
//                    }
//            ));
//
//            // Tổng doanh thu từng khách sạn và tất cả khách sạn
//            Map<Long, BigDecimal> revenuePerHotel = bookingRepo.findByHotelIdInAndCheckInDateBetween(
//                    hotelIds, startOfMonth, endOfMonth
//            ).stream().collect(Collectors.groupingBy(
//                    booking -> booking.getHotel().getId(),
//                    Collectors.reducing(BigDecimal.ZERO, Booking::getTotalPrice, BigDecimal::add)
//            ));
//
//            BigDecimal totalRevenueAllHotels = revenuePerHotel.values().stream()
//                    .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//            // Set dữ liệu trả về
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("Dashboard data retrieved successfully");
//            responseDTO.setData(Map.of(
//                    "totalHotels", totalHotels,
//                    "totalRooms", totalRooms,
//                    "roomStatistics", roomStatistics,
//                    "revenuePerHotel", revenuePerHotel,
//                    "totalRevenueAllHotels", totalRevenueAllHotels
//            ));
//
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error: " + e.getMessage());
//        }
//
//        return responseDTO;
//    }

    @Override
    public ResponseDTO getDashboardDataForUser() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Lấy thông tin tài khoản người dùng hiện tại từ SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();

            // Tìm user theo username
            User currentUser = userRepo.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Lấy tất cả khách sạn mà user hiện tại đã tạo
            List<Hotel> userHotels = hotelRepo.findByCreatorId(currentUser.getId());

            // Lấy ngày hôm nay và tháng hiện tại
            LocalDate today = LocalDate.now();
            LocalDate startOfMonth = today.withDayOfMonth(1);
            LocalDate endOfMonth = today.withDayOfMonth(today.lengthOfMonth());

            // Tổng số khách sạn và phòng
            long totalHotels = userHotels.size();
            long totalRooms = roomRepo.countByHotelIdIn(userHotels.stream().map(Hotel::getId).toList());

            // Thống kê số phòng thuê/chưa thuê theo tên khách sạn
            Map<String, Map<String, Long>> roomStatistics = userHotels.stream().collect(Collectors.toMap(
                    Hotel::getName,
                    hotel -> {
                        long totalRoomsInHotel = roomRepo.countByHotelId(hotel.getId());
                        long bookedRoomsToday = bookingRepo.findByHotelIdAndCheckInDate(hotel.getId(), today)
                                .stream().map(booking -> booking.getRoom().getId()).distinct().count();
                        long availableRooms = totalRoomsInHotel - bookedRoomsToday;

                        return Map.of(
                                "totalRooms", totalRoomsInHotel,
                                "bookedRooms", bookedRoomsToday,
                                "availableRooms", availableRooms
                        );
                    }
            ));

            // Tổng doanh thu từng khách sạn (dựa trên tên khách sạn)
            Map<String, BigDecimal> revenuePerHotel = bookingRepo.findByHotelIdInAndCheckInDateBetween(
                    userHotels.stream().map(Hotel::getId).toList(), startOfMonth, endOfMonth
            ).stream().collect(Collectors.groupingBy(
                    booking -> booking.getHotel().getName(),
                    Collectors.reducing(BigDecimal.ZERO, Booking::getTotalPrice, BigDecimal::add)
            ));

            BigDecimal totalRevenueAllHotels = revenuePerHotel.values().stream()
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            // Set dữ liệu trả về
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Dashboard data retrieved successfully");
            responseDTO.setData(Map.of(
                    "totalHotels", totalHotels,
                    "totalRooms", totalRooms,
                    "roomStatistics", roomStatistics,
                    "revenuePerHotel", revenuePerHotel,
                    "totalRevenueAllHotels", totalRevenueAllHotels
            ));

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error: " + e.getMessage());
        }

        return responseDTO;
    }

}