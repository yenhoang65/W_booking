package com.example.PhegonHotel.Controller.UserController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class MyOrderController {
    @Autowired
    private IBookingService bookingService;
    @GetMapping("/my-bookings")
    public ResponseEntity<ResponseDTO> getBookingsByUser() {
        ResponseDTO responseDTO = bookingService.getBookingsByUser();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

}
