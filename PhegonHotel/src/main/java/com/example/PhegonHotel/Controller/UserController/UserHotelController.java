package com.example.PhegonHotel.Controller.UserController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IHotelService;
import com.example.PhegonHotel.Service.Interface.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserHotelController {
    @Autowired
    private IRoomService roomService;
    @Autowired
    private IHotelService hotelService;
    @GetMapping("/hotel/all")
    public ResponseEntity<ResponseDTO> getAllHotelsUser() {
        // Gọi phương thức từ service để lấy tất cả các phòng
        ResponseDTO response = hotelService.getAllHotelUser();
        // Trả về ResponseEntity để đảm bảo định dạng chuẩn
        return ResponseEntity
                .status(response.getStatusCode())
                .body(response);
    }
}
