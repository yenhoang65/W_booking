package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Dto.UserDTO;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Utils.JWTUtils;
import com.example.PhegonHotel.Utils.Utils;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Optional;


@Slf4j
@Service
public class GoogleAuthService {
    private static final String CLIENT_ID = "810195372982-s35n7g346h9hkjrhd8sr2edd4uqtsq91.apps.googleusercontent.com";
    private static final JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

    private static final String GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";
    private static final String DEFAULT_EMAIL = "email";
    private static final String DEFAULT_NAME = "name";
    private static final String DEFAULT_PICTURE = "picture";
    @Autowired
    private  UserRepo userRepo;
    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;


    public GoogleIdToken verifyToken(String token) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(GoogleNetHttpTransport.newTrustedTransport(), jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        return verifier.verify(token);
    }

    public ResponseDTO loginGoogleAuth(String token) {
        log.info("Token Google: {}", token);
        try {
            // Lấy thông tin người dùng từ Google
            JsonObject userInfo = getUserInfoFromGoogle(token);
            String email = userInfo.has(DEFAULT_EMAIL) ?
                    userInfo.get(DEFAULT_EMAIL).getAsString() : null;
            String name = userInfo.has(DEFAULT_NAME) ?
                    userInfo.get(DEFAULT_NAME).getAsString() : null;
            String avatar = userInfo.has(DEFAULT_PICTURE) ?
                    userInfo.get(DEFAULT_PICTURE).getAsString() : null;

            // Tìm hoặc tạo người dùng
            User user = findOrCreateUser(email, name, avatar);
            return createAuthResponse(user);

        } catch (Exception e) {
            log.error("Error while processing Google auth: {}", e.getMessage());
            return null;
        }
    }

    private JsonObject getUserInfoFromGoogle(String token) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                GOOGLE_TOKEN_INFO_URL,
                HttpMethod.GET,
                entity,
                String.class
        );

        return JsonParser.parseString(response.getBody()).getAsJsonObject();
    }

    private User findOrCreateUser(String email, String name, String avatar) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        User newUser = new User();

        if(optionalUser.isEmpty()) {
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setUsername(email);
            newUser.setPhoto(avatar);
            newUser.setStatus("DANG_SU_DUNG");
            newUser.setRole("USER");
            newUser.setPhoneNumber("0987654321");
            // Mật khẩu mặc định hoặc có thể cập nhật
            String password = "123";
            newUser.setPassword(passwordEncoder.encode(password));
            userRepo.save(newUser);
            return newUser;
        }
        newUser = optionalUser.get();
        newUser.setPhoto(avatar);
        newUser.setName(name);
        userRepo.save(newUser);
        return newUser;
    }

    private ResponseDTO createAuthResponse(User user) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            var token = jwtUtils.generateToken(user);

            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            // Thiết lập thông tin vào ResponseDTO
            responseDTO.setUser(userDTO);
            responseDTO.setRole(user.getRole());
            responseDTO.setStatusCode(200);
            responseDTO.setToken(token);
            responseDTO.setExpirationTime("10 Phút");
            responseDTO.setMessage("successful");
        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error Occurred During User Registration " + e.getMessage());
        }
        return responseDTO;
    }
}
