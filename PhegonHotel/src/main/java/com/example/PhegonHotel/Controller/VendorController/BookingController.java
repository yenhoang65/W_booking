package com.example.PhegonHotel.Controller.VendorController;

import com.example.PhegonHotel.Dto.BookingDTO;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.Booking;
import com.example.PhegonHotel.Service.Interface.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vendor/bookings")
public class BookingController {
    @Autowired
    private IBookingService bookingService;

    @PostMapping("/book-room/{userId}/{hotelId}/{roomId}")
    @PreAuthorize("hasAuthority('VENDOR') or hasAuthority('USER')")
    public ResponseEntity<ResponseDTO> saveBookings(@PathVariable Long roomId,
                                                    @PathVariable Long userId,
                                                    @PathVariable Long hotelId,
                                                    @RequestBody Booking bookingRequest) {


        ResponseDTO responseDTO = bookingService.saveBooking(roomId, userId,hotelId, bookingRequest);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('VENDOR')")
    public ResponseEntity<ResponseDTO> getAllBookings() {
        ResponseDTO responseDTO = bookingService.getAllBookings();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/{bookingId}")
    @PreAuthorize("hasAuthority('VENDOR') or hasAuthority('USER')")
    public ResponseEntity<ResponseDTO> getBookingDetailById(@PathVariable("bookingId") Long bookingId) {
        ResponseDTO response = bookingService.getBookingDetailById(bookingId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<ResponseDTO> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        ResponseDTO responseDTO = bookingService.findBookingByConfirmationCode(confirmationCode);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @DeleteMapping("/cancel/{bookingId}")
    @PreAuthorize("hasAuthority('VENDOR') or hasAuthority('USER')")
    public ResponseEntity<ResponseDTO> cancelBooking(@PathVariable Long bookingId) {
        ResponseDTO responseDTO = bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

}
