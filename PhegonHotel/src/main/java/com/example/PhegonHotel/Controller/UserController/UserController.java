package com.example.PhegonHotel.Controller.UserController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<ResponseDTO> getUserById(@PathVariable("userId") String userId) {
        ResponseDTO responseDTO = userService.getUserById(userId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<ResponseDTO> getLoggedInUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ResponseDTO responseDTO = userService.getMyInfo(email);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/get-user-bookings/{userId}")
    public ResponseEntity<ResponseDTO> getUserBookingHistory(@PathVariable("userId") String userId) {
        ResponseDTO responseDTO = userService.getUserBookingHistory(userId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<ResponseDTO> updateUser(
            @PathVariable Long userId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "numberPhone", required = false) String numberPhone,
            @RequestParam(value = "password", required = false) String password
    ) {
        ResponseDTO responseDTO = userService.updateUser(userId, name, username, password, status, email, numberPhone, photo, role);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }
}
