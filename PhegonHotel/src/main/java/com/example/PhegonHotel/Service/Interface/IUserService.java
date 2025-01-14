package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.LoginRequest;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.User;
import org.springframework.web.multipart.MultipartFile;
//import org.springframework.security.oauth2.core.user.OAuth2User;


public interface IUserService {
    ResponseDTO register(User user);

    ResponseDTO login(LoginRequest loginRequest);

    ResponseDTO getAllUsers();

    ResponseDTO getUserBookingHistory(String userId);

    ResponseDTO deleteUser(String userId);

    ResponseDTO getUserById(String userId);

    ResponseDTO getMyInfo(String username);



    ResponseDTO updateUser(Long userId,
                           String name,
                           String username,
                           String password,
                           String status,
                           String email,
                           String phoneNumber,
                           MultipartFile photo,
                           String role);


    ResponseDTO forgotPassword(String email);

    ResponseDTO verifyOtp(String otp);

    ResponseDTO resetPassword(String email,String newPassword, String confirmPassword);

}
