package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.LoginRequest;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Dto.RoomDTO;
import com.example.PhegonHotel.Dto.UserDTO;
//import com.example.PhegonHotel.Entity.Role;
import com.example.PhegonHotel.Entity.Room;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Exception.OurException;
//import com.example.PhegonHotel.Repository.RoleRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.AwsS3Service;
import com.example.PhegonHotel.Service.Interface.IUserService;
import com.example.PhegonHotel.Utils.JWTUtils;
import com.example.PhegonHotel.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public ResponseDTO register(User user) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            user.setStatus("1");
            if (userRepo.existsByUsername(user.getUsername())) {
                throw new OurException(user.getUsername() + "Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepo.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            responseDTO.setStatusCode(200);
            responseDTO.setUser(userDTO);
        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error Occurred During User Registration " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO login(LoginRequest loginRequest) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Xác thực người dùng
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            var user = userRepo.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new OurException("User not found"));

            var token = jwtUtils.generateToken(user);

            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            responseDTO.setUser(userDTO);
            responseDTO.setRole(user.getRole());
            responseDTO.setStatusCode(200);
            responseDTO.setToken(token);
            responseDTO.setExpirationTime("10 Phút");
            responseDTO.setMessage("successful");

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {

            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Đã xảy ra lỗi khi người dùng đăng nhập " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getAllUsers() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<User> userList = userRepo.findAll();
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setUserList(userDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Lỗi nhận tất cả người dùng" + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getUserBookingHistory(String userId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            User user = userRepo.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setUser(userDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {

            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error getting all users " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO deleteUser(String userId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            userRepo.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            userRepo.deleteById(Long.valueOf(userId));
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {

            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error getting all users " + e.getMessage());
        }
        return responseDTO;

    }

    @Override
    public ResponseDTO getUserById( String userId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            User user = userRepo.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setUser(userDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {

            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error getting all users " + e.getMessage());
        }
        return responseDTO;
    }


    @Override
    public ResponseDTO getMyInfo(String username) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            User user = userRepo.findByUsername(username).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setUser(userDTO);
            responseDTO.setRole(userDTO.getRole());

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());

        } catch (Exception e) {

            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error getting all users " + e.getMessage());
        }
        return responseDTO;

    }

    @Override
    public ResponseDTO updateUser(
            Long userId,
            String name,
            String username,
            String password,
            String status,
            String email,
            String phoneNumber,
            MultipartFile photo,
            String role) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            if (email != null) user.setEmail(email);
            if (name != null) user.setName(name);
            if (username != null) user.setUsername(username);
            if (status != null) user.setStatus(status);
            if (phoneNumber != null) user.setPhoneNumber(phoneNumber);
            if (role != null) user.setRole(role);
            if (imageUrl != null) user.setPhoto(imageUrl);
            if (password != null && !password.isEmpty()) {
                user.setPassword(passwordEncoder.encode(password)); // Mã hóa mật khẩu
            }

            User updatedUser = userRepo.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(updatedUser);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("User updated successfully");
            responseDTO.setUser(userDTO);

        } catch (Exception e) {
            responseDTO.setStatusCode(500); // Lỗi server
            responseDTO.setMessage("Error updating user: " + e.getMessage());
        }
        return responseDTO;
    }

//    public void saveNewUserIfNotExist(String googleId, String name, String email) {
//        User existingUser = userRepo.findByGoogleId(googleId);
//        if (existingUser == null) {
//            User newUser = new User();
//            newUser.setGoogleId(googleId);
//            newUser.setName(name);
//            newUser.setEmail(email);
//            userRepo.save(newUser);
//        } else {
//            existingUser.setName(name);
//            userRepo.save(existingUser);
//        }
//    }

}
