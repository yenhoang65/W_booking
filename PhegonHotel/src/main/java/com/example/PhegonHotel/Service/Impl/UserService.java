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
import com.example.PhegonHotel.Service.EmailService;
import com.example.PhegonHotel.Service.Interface.IUserService;
import com.example.PhegonHotel.Utils.JWTUtils;
import com.example.PhegonHotel.Utils.Utils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EmailService emailService;
    @Autowired
    private HttpSession session;
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



//    @Override
//    public ResponseDTO forgotPassword(String email) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu
//            Optional<User> userOpt = userRepo.findByEmail(email);
//            if (userOpt.isEmpty()) {
//                throw new OurException("Email không tồn tại trong hệ thống");
//            }
//
//            // Tạo OTP ngẫu nhiên
//            String otp = Utils.generateOtp(6); // Tạo OTP 6 chữ số
//
//            // Lưu OTP và email vào session
//            session.setAttribute("otp", otp);
//            session.setAttribute("email", email);
//            session.setAttribute("otp_expiry", System.currentTimeMillis() + 5 * 60 * 1000); // Hạn 5 phút
//
//            // Gửi OTP qua email
//            String subject = "Quên mật khẩu - OTP của bạn";
//            String body = "Mã OTP của bạn là: " + otp + ". Mã này có hiệu lực trong 5 phút.";
//            emailService.sendEmail(email, subject, body);
//
//            // Cập nhật Response
//            responseDTO.setMessage("OTP đã được gửi tới email");
//            responseDTO.setStatusCode(200);
//        } catch (OurException e) {
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Đã xảy ra lỗi: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//
//    @Override
//    public ResponseDTO verifyOtp(String otp) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Lấy OTP và email từ session
//            String sessionOtp = (String) session.getAttribute("otp");
//            Long otpExpiry = (Long) session.getAttribute("otp_expiry");
//
//            // Kiểm tra OTP có tồn tại và chưa hết hạn
//            if (sessionOtp == null || otpExpiry == null || System.currentTimeMillis() > otpExpiry) {
//                throw new OurException("OTP đã hết hạn hoặc không hợp lệ");
//            }
//
//            if (!sessionOtp.equals(otp)) {
//                throw new OurException("OTP không chính xác");
//            }
//
//            // OTP hợp lệ
//            responseDTO.setMessage("OTP hợp lệ, bạn có thể thay đổi mật khẩu");
//            responseDTO.setStatusCode(200);
//        } catch (OurException e) {
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Đã xảy ra lỗi: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//
//
//    @Override
//    public ResponseDTO resetPassword(String newPassword, String confirmPassword) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Lấy email từ session
//            String email = (String) session.getAttribute("email");
//
//            // Kiểm tra email trong session
//            if (email == null) {
//                throw new OurException("Không tìm thấy thông tin email trong phiên làm việc");
//            }
//
//            // Kiểm tra mật khẩu mới và xác nhận mật khẩu
//            if (!newPassword.equals(confirmPassword)) {
//                throw new OurException("Mật khẩu xác nhận không khớp");
//            }
//
//            // Lấy user từ email
//            User user = userRepo.findByEmail(email).orElseThrow(() -> new OurException("Không tìm thấy người dùng"));
//
//            // Mã hóa mật khẩu mới
//            user.setPassword(passwordEncoder.encode(newPassword));
//            userRepo.save(user);
//
//            // Xóa session sau khi đặt lại mật khẩu thành công
//            session.removeAttribute("email");
//            session.removeAttribute("otp");
//            session.removeAttribute("otp_expiry");
//
//            responseDTO.setMessage("Đặt lại mật khẩu thành công");
//            responseDTO.setStatusCode(200);
//        } catch (OurException e) {
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Đã xảy ra lỗi: " + e.getMessage());
//        }
//        return responseDTO;
//    }

    @Override
    public ResponseDTO forgotPassword(String email) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu
            Optional<User> userOpt = userRepo.findByEmail(email);
            if (userOpt.isEmpty()) {
                throw new OurException("Email không tồn tại trong hệ thống");
            }

            // Nếu email hợp lệ
            responseDTO.setMessage("Email hợp lệ");
            responseDTO.setStatusCode(200);
        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Đã xảy ra lỗi: " + e.getMessage());
        }
        return responseDTO;
    }
    @Override
    public ResponseDTO verifyOtp(String otp) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            // Logic xác thực OTP có thể bỏ qua vì OTP được xác thực ở FE
            responseDTO.setMessage("OTP hợp lệ");
            responseDTO.setStatusCode(200);
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Đã xảy ra lỗi: " + e.getMessage());
        }
        return responseDTO;
    }


    @Override
    public ResponseDTO resetPassword(String email, String newPassword, String confirmPassword) {
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
        return responseDTO;
    }

}
