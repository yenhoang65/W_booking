package com.example.PhegonHotel.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "contact_requests")
public class ContactRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String Taxcode;//mã số thuế
    private String message;
    @Column(name = "user_id")
    private Long userId;

}