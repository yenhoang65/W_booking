package com.example.PhegonHotel.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    /**

     * @param to      Email người nhận
     * @param subject Tiêu đề email
     * @param body    Nội dung email
     */
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("hoangsyyen123@gmail.com"); // Email của người gửi (cấu hình trong application.properties)

        // Gửi email
        emailSender.send(message);
    }
}
