package com.example.PhegonHotel.Controller;

import com.example.PhegonHotel.Dto.LoginRequest;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.Impl.GoogleAuthService;
import com.example.PhegonHotel.Service.Interface.IUserService;
import com.example.PhegonHotel.Utils.JWTUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private  IUserService userService;
    @Autowired
    private  GoogleAuthService googleAuthService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody User user) {
        ResponseDTO responseDTO = userService.register(user);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Username: " + loginRequest.getUsername());
        System.out.println("Password: " + loginRequest.getPassword());
        ResponseDTO responseDTO = userService.login(loginRequest);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PostMapping("/google")
    public ResponseEntity<ResponseDTO> loginGoogle(@Valid @RequestParam String token) {
        return new ResponseEntity<>(googleAuthService.loginGoogleAuth(token), HttpStatus.OK);
    }

}