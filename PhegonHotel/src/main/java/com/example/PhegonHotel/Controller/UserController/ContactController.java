package com.example.PhegonHotel.Controller.UserController;

import com.example.PhegonHotel.Entity.ContactRequest;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Repository.ContactRequestRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class ContactController {

    @Autowired
    private ContactRequestRepo contactRequestRepository;

    @Autowired
    private UserRepo userRepository; // Repository cho User

    @PostMapping("/contact")
    public ResponseEntity<String> sendContact(@RequestBody ContactRequest contactRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        Optional<User> optionalUser = userRepository.findByUsername(currentUsername);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            contactRequest.setUserId(user.getId());
            contactRequestRepository.save(contactRequest);
            user.setStatus("PENDING");
            userRepository.save(user);
            return ResponseEntity.ok("Thông điệp đã được gửi thành công");
        } else {
            return ResponseEntity.status(404).body("Người dùng không tồn tại.");
        }
    }

    
    @GetMapping("/requests")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ContactRequest>> getAllContactRequests() {
        List<ContactRequest> contactRequests = contactRequestRepository.findAll();
        return ResponseEntity.ok(contactRequests);
    }
}
