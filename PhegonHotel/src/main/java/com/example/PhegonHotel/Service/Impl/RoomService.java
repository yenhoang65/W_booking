package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.HotelDTO;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Dto.RoomDTO;
import com.example.PhegonHotel.Entity.Hotel;
import com.example.PhegonHotel.Entity.Room;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Exception.UnauthorizedAccessException;
import com.example.PhegonHotel.Repository.BookingRepo;
import com.example.PhegonHotel.Repository.HotelRepo;
import com.example.PhegonHotel.Repository.RoomRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.AwsS3Service;
import com.example.PhegonHotel.Service.Interface.IRoomService;
import com.example.PhegonHotel.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.PageRequest; // PageRequest của Spring Data
import org.springframework.data.domain.Pageable;    // Pageable của Spring Data

import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.security.PrivateKey;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService implements IRoomService {

    @Autowired
    private RoomRepo roomRepo;
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private HotelRepo hotelRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public ResponseDTO addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description, String status,Long hotelId,List<String> amenities) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Lấy thông tin vendor hiện tại
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User userCreator = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Creator not found"));
            String imageUrl = awsS3Service.saveImageToS3(photo);

            // Tìm khách sạn theo ID
            Hotel hotel = hotelRepo.findById(hotelId).orElseThrow(() -> new OurException("Hotel Not Found"));

            Room room = new Room();
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(description);
            room.setUserCreator(userCreator);
            room.setStatus(status);
            room.setHotel(hotel); // Thiết lập mối quan hệ với khách sạn
            room.setAmenities(amenities);
            Room savedRoom = roomRepo.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setRoom(roomDTO);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error saving a room " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepo.findDistinctRoomTypes();
    }

    @Override
    public ResponseDTO getAllRooms() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User userCreator = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Room> roomList = roomRepo.findByUserCreatorId(userCreator.getId());
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Rooms retrieved successfully");
            responseDTO.setRoomList(roomDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error saving a room " + e.getMessage());
        }
        return responseDTO;
    }

    // Lấy tất cả các phòng mà người dùng có thể xem
    @Override
    public ResponseDTO getAllRoomsUser() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<Room> roomList = roomRepo.findAll();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Rooms retrieved successfully");
            responseDTO.setRoomList(roomDTOList);
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving rooms: " + e.getMessage());
        }

        return responseDTO;
    }

    @Override
    public ResponseDTO deleteRoom(Long roomId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User userCreator = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Room room = roomRepo.findById(roomId)
                    .orElseThrow(() -> new OurException("Room Not Found"));

            if (!room.getUserCreator().equals(userCreator)) {
                throw new UnauthorizedAccessException("Bạn không được phép xóa phòng này");
            }
            roomRepo.deleteById(roomId);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Room deleted successfully");
        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error saving a room " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo, String status,Long hotelId,List<String> amenities) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User userCreator = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Room room = roomRepo.findById(roomId)
                    .orElseThrow(() -> new OurException("Room Not Found"));

            if (!room.getUserCreator().equals(userCreator)) {
                throw new UnauthorizedAccessException("You are not authorized to update this room");
            }

            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            if (roomType != null) room.setRoomType(roomType);
            if (roomPrice != null) room.setRoomPrice(roomPrice);
            if (description != null) room.setRoomDescription(description);
            if (status != null) room.setStatus(status);
            if (imageUrl != null) room.setRoomPhotoUrl(imageUrl);

            // Cập nhật mối quan hệ với khách sạn nếu hotelId không null
            if (hotelId != null) {
                Hotel hotel = hotelRepo.findById(hotelId).orElseThrow(() -> new OurException("Hotel Not Found"));
                room.setHotel(hotel);
            }

            // Cập nhật tiện nghi nếu có
            if (amenities != null && !amenities.isEmpty()) {
                room.setAmenities(amenities);
            }


            Room updatedRoom = roomRepo.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setRoom(roomDTO);

        } catch (UnauthorizedAccessException e) {
            responseDTO.setStatusCode(403);
            responseDTO.setMessage(e.getMessage());
        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error updating room: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getRoomById(Long roomId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Room room = roomRepo.findById(roomId)
                    .orElseThrow(() -> new OurException("Room Not Found"));

            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTOPlusBookings(room);

            if (room.getHotel() != null) {
                HotelDTO hotelDTO = Utils.mapHotelEntityToHotelDTO(room.getHotel());
                roomDTO.setHotel(hotelDTO);
            }

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setRoom(roomDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving room: " + e.getMessage());
        }
        return responseDTO;
    }


    @Override
    public ResponseDTO getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {


            List<Room> availableRooms = roomRepo.findAvailableRoomsByDatesAndTypes(checkInDate, checkOutDate, roomType);
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setRoomList(roomDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error saving a room " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getAllAvailableRooms() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            List<Room> roomList = roomRepo.getAllAvailableRooms();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setRoomList(roomDTOList);

        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error saving a room " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getTop5MostBookedRooms() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Pageable top5 = PageRequest.of(0, 5); // Đúng import
            List<Room> topRooms = roomRepo.findTop5RoomsByBookingCount(top5);

            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(topRooms);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Top 5 most booked rooms retrieved successfully");
            responseDTO.setRoomList(roomDTOList);
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving top 5 rooms: " + e.getMessage());
        }

        return responseDTO;
    }



}
