package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.Booking;

import java.util.List;

public interface IBookingService {

    ResponseDTO saveBooking(Long roomId, Long userId,Long hotelId, Booking bookingRequest);

    ResponseDTO findBookingByConfirmationCode(String confirmationCode);

    ResponseDTO getAllBookings();

    ResponseDTO cancelBooking(Long bookingId);

    ResponseDTO getBookingDetailById(Long bookingId);

    ResponseDTO getBookingsByUser();
}
