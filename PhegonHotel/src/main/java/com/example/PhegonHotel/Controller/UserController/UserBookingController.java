package com.example.PhegonHotel.Controller.UserController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.Booking;
import com.example.PhegonHotel.Service.Interface.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/bookings")
public class UserBookingController {

    @Autowired
    private IBookingService bookingService;

    @PostMapping("/book-room/{roomId}/{userId}/{hotelId}")
//    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ResponseDTO> saveBookings(@PathVariable Long roomId,
                                                    @PathVariable Long userId,
                                                    @PathVariable Long hotelId,
                                                    @RequestBody Booking bookingRequest) {


        ResponseDTO responseDTO = bookingService.saveBooking(roomId, userId,hotelId, bookingRequest);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);

    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<ResponseDTO> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        ResponseDTO responseDTO = bookingService.findBookingByConfirmationCode(confirmationCode);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @DeleteMapping("/cancel/{bookingId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ResponseDTO> cancelBooking(@PathVariable Long bookingId) {
        ResponseDTO responseDTO = bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

}
