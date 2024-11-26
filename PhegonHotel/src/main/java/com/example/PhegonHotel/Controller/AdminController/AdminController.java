package com.example.PhegonHotel.Controller.AdminController;


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
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private IUserService userService;


    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> deleteUSer(@PathVariable("userId") String userId) {
        ResponseDTO responseDTO = userService.deleteUser(userId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<ResponseDTO> getLoggedInUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        ResponseDTO responseDTO = userService.getMyInfo(username);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> getAllUsers() {
        ResponseDTO responseDTO = userService.getAllUsers();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PutMapping("/update/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
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
        System.out.println("name"+ name);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

}
