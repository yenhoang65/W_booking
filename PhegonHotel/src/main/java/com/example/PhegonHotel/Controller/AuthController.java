package com.example.PhegonHotel.Controller;

import com.example.PhegonHotel.Dto.LoginRequest;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.EmailService;
import com.example.PhegonHotel.Service.Impl.GoogleAuthService;
import com.example.PhegonHotel.Service.Interface.IHotelService;
import com.example.PhegonHotel.Service.Interface.IUserService;
import com.example.PhegonHotel.Utils.JWTUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private  IUserService userService;
    @Autowired
    private IHotelService hotelService;
    @Autowired
    private  GoogleAuthService googleAuthService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody User user) {
        ResponseDTO responseDTO = userService.register(user);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequest loginRequest) {
        ResponseDTO responseDTO = userService.login(loginRequest);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PostMapping("/google")
    public ResponseEntity<ResponseDTO> loginGoogle(@Valid @RequestParam String token) {
        return new ResponseEntity<>(googleAuthService.loginGoogleAuth(token), HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ResponseDTO> forgotPassword(@RequestParam String email) {
        ResponseDTO response = new ResponseDTO();
        try {
            // Kiểm tra email có tồn tại trong hệ thống
            Optional<User> userOpt = userRepo.findByEmail(email);
            if (userOpt.isEmpty()) {
                throw new OurException("Email không tồn tại trong hệ thống");
            }
            response.setMessage("Email hợp lệ");
            response.setStatusCode(200);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Đã xảy ra lỗi: " + e.getMessage());
        }
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }



    @PostMapping("/send-email")
    public ResponseEntity<ResponseDTO> sendEmail(@RequestParam String email,
                                                 @RequestParam String subject,
                                                 @RequestParam String body) {
        ResponseDTO response = new ResponseDTO();
        try {
            // Gửi email qua EmailService
            emailService.sendEmail(email, subject, body);
            response.setMessage("OTP đã được gửi tới email");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Đã xảy ra lỗi khi gửi email: " + e.getMessage());
        }
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ResponseDTO> resetPassword(@RequestParam String email,
                                                     @RequestParam String newPassword,
                                                     @RequestParam String confirmPassword) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            // Kiểm tra mật khẩu mới và xác nhận mật khẩu
            if (!newPassword.equals(confirmPassword)) {
                throw new OurException("Mật khẩu xác nhận không khớp");
            }

            // Lấy user từ email
            User user = userRepo.findByEmail(email)
                    .orElseThrow(() -> new OurException("Không tìm thấy người dùng"));

            // Mã hóa mật khẩu mới
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepo.save(user);

            responseDTO.setMessage("Đặt lại mật khẩu thành công");
            responseDTO.setStatusCode(200);
        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Đã xảy ra lỗi: " + e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, HttpStatus.valueOf(responseDTO.getStatusCode()));
    }




}