package com.example.PhegonHotel.Repository;

import com.example.PhegonHotel.Entity.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRequestRepo extends JpaRepository<ContactRequest, Long> {
    List<ContactRequest> findAll();
}
