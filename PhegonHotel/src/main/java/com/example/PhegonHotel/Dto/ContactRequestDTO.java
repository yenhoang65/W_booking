package com.example.PhegonHotel.Dto;

import lombok.Data;

@Data
public class ContactRequestDTO {
    private Long id;
    private String name;
    private String taxcode; // mã số thuế
    private String message;
    private Long userId;
}
