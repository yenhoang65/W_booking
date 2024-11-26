//package com.example.PhegonHotel.Controller.AdminController;
//
//
//import com.example.PhegonHotel.Entity.ContactRequest;
//import com.example.PhegonHotel.Repository.ContactRequestRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/admin/contact")
//public class ContactController {
//
//    @Autowired
//    private ContactRequestRepo contactRequestRepo;
//
//    @GetMapping("/requests")
//    public ResponseEntity<List<ContactRequest>> getAllContactRequests() {
//        List<ContactRequest> requests = contactRequestRepo.findAll();
//        return ResponseEntity.ok(requests);
//    }
//}
