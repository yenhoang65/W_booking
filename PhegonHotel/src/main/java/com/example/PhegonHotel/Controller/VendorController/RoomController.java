package com.example.PhegonHotel.Controller.VendorController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IBookingService;
import com.example.PhegonHotel.Service.Interface.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("vendor/rooms")
public class RoomController {
    @Autowired
    private IRoomService roomService;

    @Autowired
    private IBookingService iBookingService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('VENDOR')")
    public ResponseEntity<ResponseDTO> addNewRoom(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "roomType", required = false) String roomType,
            @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "roomDescription", required = false) String roomDescription,
            @RequestParam(value = "hotelId", required = false) Long hotelId,
            @RequestParam(value = "amenities", required = false) List<String> amenities
    ) {

        if (photo == null || photo.isEmpty() || roomType == null || roomType.isBlank() || roomPrice == null || roomType.isBlank()) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setStatusCode(400);
            responseDTO.setMessage("Vui lòng cung cấp giá trị cho tất cả các trường (photo, roomType,roomPrice)");
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }
        System.out.println("photo" +photo);
        System.out.println("roomType" +roomType);
        System.out.println("roomPrice" +roomPrice);
        System.out.println("status" +status);
        System.out.println("roomDescription" +roomDescription);
        ResponseDTO responseDTO = roomService.addNewRoom(photo, roomType, roomPrice, roomDescription,status,hotelId, amenities);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllRooms() {
        ResponseDTO responseDTO = roomService.getAllRooms();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/room-by-id/{roomId}")
    public ResponseEntity<ResponseDTO> getRoomById(@PathVariable Long roomId) {
        ResponseDTO responseDTO = roomService.getRoomById(roomId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/all-available-rooms")
    public ResponseEntity<ResponseDTO> getAvailableRooms() {
        ResponseDTO responseDTO = roomService.getAllAvailableRooms();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<ResponseDTO> getAvailableRoomsByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String roomType
    ) {
        if (checkInDate == null || roomType == null || roomType.isBlank() || checkOutDate == null) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setStatusCode(400);
            responseDTO.setMessage("Vui lòng cung cấp giá trị cho tất cả các trường (checkInDate, roomType,checkOutDate)");
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }
        ResponseDTO responseDTO = roomService.getAvailableRoomsByDataAndType(checkInDate, checkOutDate, roomType);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasAuthority('VENDOR')")
        public ResponseEntity<ResponseDTO> updateRoom(
                @PathVariable Long roomId,
                @RequestParam(value = "photo", required = false) MultipartFile photo,
                @RequestParam(value = "roomType", required = false) String roomType,
                @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
                @RequestParam(value = "status", required = false) String status,
                @RequestParam(value = "roomDescription", required = false) String roomDescription,
                @RequestParam(value = "hotelId", required = false) Long hotelId,
                @RequestParam(value = "amenities", required = false) List<String> amenities
        ) {
            ResponseDTO responseDTO = roomService.updateRoom(roomId, roomDescription, roomType, roomPrice, photo,status,hotelId, amenities);
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }

    @DeleteMapping("/delete/{roomId}")
    @PreAuthorize("hasAuthority('VENDOR')")
    public ResponseEntity<ResponseDTO> deleteRoom(@PathVariable Long roomId) {
        ResponseDTO responseDTO = roomService.deleteRoom(roomId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);

    }
}
