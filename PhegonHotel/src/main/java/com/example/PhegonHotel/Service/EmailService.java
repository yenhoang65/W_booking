package com.example.PhegonHotel.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String from, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from); // Email của người gửi
        message.setTo("hoangsyyen123@gmail.com");
        message.setSubject(subject);
        message.setText(body);

        // Gửi email
        emailSender.send(message);
    }
}
