package com.example.PhegonHotel.Exception;

public class OurException extends RuntimeException {

    // Constructor nhận thông điệp lỗi
    public OurException(String message) {
        super(message);  // Gọi constructor của lớp Exception
    }
}

