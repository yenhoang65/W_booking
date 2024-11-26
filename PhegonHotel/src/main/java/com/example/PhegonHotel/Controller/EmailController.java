package com.example.PhegonHotel.Controller;

import com.example.PhegonHotel.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        // Gọi phương thức gửi email
        emailService.sendEmail(emailRequest.getFrom(), emailRequest.getSubject(), emailRequest.getBody());
        return ResponseEntity.ok("Email sent successfully");
    }
}
class EmailRequest {
    private String from;  // Email của người gử
    private String subject;
    private String body;

    // Getter cho trường 'to'
    public String getFrom() {
        return from;
    }

    // Setter cho trường 'to'
    public void setFrom(String from) {
        this.from = from;
    }

    // Getter cho trường 'subject'
    public String getSubject() {
        return subject;
    }

    // Setter cho trường 'subject'
    public void setSubject(String subject) {
        this.subject = subject;
    }

    // Getter cho trường 'body'
    public String getBody() {
        return body;
    }

    // Setter cho trường 'body'
    public void setBody(String body) {
        this.body = body;
    }
}