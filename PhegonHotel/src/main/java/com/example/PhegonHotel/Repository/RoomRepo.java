package com.example.PhegonHotel.Repository;

import com.example.PhegonHotel.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface RoomRepo extends JpaRepository<Room,Long> {
// xử dụng JPQL

    //nó chọn các giá trị roomType không trùng lặp (DISTINCT) từ thực thể Room.
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    List<Room> findByUserCreatorId(Long hotelId);

    @Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND r.id NOT IN (SELECT bk.room.id FROM Booking bk WHERE" +
            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    List<Room> findAvailableRoomsByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String roomType);


    @Query("SELECT r FROM Room r WHERE r.id NOT IN (SELECT b.room.id FROM Booking b)")
    List<Room> getAllAvailableRooms();

    List<Room> findByHotelIdIn(List<Long> hotelIds);

    @Query("SELECT r FROM Room r JOIN Booking b ON r.id = b.room.id " +
            "GROUP BY r.id " +
            "ORDER BY COUNT(b.id) DESC")
    List<Room> findTop5RoomsByBookingCount(Pageable pageable);

    long countByHotelId(Long hotelId);
    long countByHotelIdIn(java.util.List<Long> hotelIds);
}
