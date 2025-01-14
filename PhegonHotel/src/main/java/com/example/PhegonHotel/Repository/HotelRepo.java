package com.example.PhegonHotel.Repository;

import com.example.PhegonHotel.Entity.Booking;
import com.example.PhegonHotel.Entity.Hotel;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelRepo extends JpaRepository<Hotel, Long> {
    @Query("SELECT DISTINCT h.name FROM Hotel h")
    List<String> findDistinctHotelNames();

    List<Hotel> findByCreatorId(Long creatorId);

    List<Hotel> findByNation(String nation);
}
