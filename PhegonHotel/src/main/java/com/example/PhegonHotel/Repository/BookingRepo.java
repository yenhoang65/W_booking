package com.example.PhegonHotel.Repository;

import com.example.PhegonHotel.Entity.Booking;
import com.example.PhegonHotel.Entity.Hotel;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepo extends JpaRepository<Booking, Long> {

    List<Booking> findByRoomId(Long roomId);

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    List<Booking> findByUserId(Long userId);

    List<Hotel> findByHotelId(Long hotelId);

    List<Booking> findByCheckInDateBetween(LocalDate start, LocalDate end);


    List<Booking> findByHotelIdIn(List<Long> hotelIds);

    List<Booking> findByHotelIdAndCheckInDate(Long hotelId, LocalDate checkInDate);
    List<Booking> findByHotelIdInAndCheckInDateBetween(List<Long> hotelIds, LocalDate start, LocalDate end);
}
