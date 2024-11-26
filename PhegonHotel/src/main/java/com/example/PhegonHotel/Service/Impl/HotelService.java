package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.HotelDTO;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Dto.RoomDTO;
import com.example.PhegonHotel.Entity.Hotel;
import com.example.PhegonHotel.Entity.Room;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Exception.UnauthorizedAccessException;
import com.example.PhegonHotel.Repository.HotelRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.AwsS3Service;
import com.example.PhegonHotel.Service.Interface.IHotelService;
import com.example.PhegonHotel.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class HotelService implements IHotelService {
    @Autowired
    private HotelRepo hotelRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AwsS3Service awsS3Service;


    @Override
    public ResponseDTO addNewHotel(MultipartFile photo,String nation, String city, String name, String address, String description) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            // Lấy thông tin người dùng hiện tại từ Spring Security
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User creator = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Creator not found"));

            // Lưu ảnh lên S3 và lấy URL
            String imageUrl = awsS3Service.saveImageToS3(photo);

            // Tạo mới khách sạn và thiết lập thông tin
            Hotel hotel = new Hotel();
            hotel.setPhoto(imageUrl);
            hotel.setName(name);
            hotel.setAddress(address);
            hotel.setNation(nation);
            hotel.setCity(city);
            hotel.setDescription(description);
            hotel.setCreator(creator);  // Thiết lập người tạo là người dùng hiện tại



            // Lưu khách sạn vào cơ sở dữ liệu
            Hotel savedHotel = hotelRepo.save(hotel);

            // Chuyển đổi đối tượng khách sạn thành DTO
            HotelDTO hotelDTO = Utils.mapHotelEntityToHotelDTO(savedHotel);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("successful");
            responseDTO.setHotel(hotelDTO);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error saving a hotel: " + e.getMessage());
        }
        return responseDTO;
    }


    // Lấy tất cả các phòng mà người dùng có thể xem
    @Override
    public ResponseDTO getAllHotelUser() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            // Lấy tất cả các phòng trong cơ sở dữ liệu
            List<Hotel> hotelList = hotelRepo.findAll();
            List<HotelDTO> hotelDTOList = Utils.mapHotelListEntityToHotelListDTO(hotelList);

            // Trả về kết quả thành công
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Hotel   retrieved successfully");
            responseDTO.setHotelList(hotelDTOList);
        } catch (Exception e) {
            // Trả về lỗi nếu có bất kỳ vấn đề nào xảy ra
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving rooms: " + e.getMessage());
        }

        return responseDTO;
    }



    @Override
    public ResponseDTO getAllHotels() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Hotel> hotelList = hotelRepo.findByCreatorId(currentUser.getId());
            List<HotelDTO> hotelDTOList = Utils.mapHotelListEntityToHotelListDTO(hotelList);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Hotels retrieved successfully");
            responseDTO.setHotelList(hotelDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving hotels: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO deleteHotel(Long hotelId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Hotel hotel = hotelRepo.findById(hotelId)
                    .orElseThrow(() -> new OurException("Hotel Not Found"));

            if (!hotel.getCreator().equals(currentUser)) {
                throw new UnauthorizedAccessException("You are not authorized to delete this hotel");
            }

            hotelRepo.deleteById(hotelId);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Hotel deleted successfully");

        } catch (UnauthorizedAccessException e) {
            responseDTO.setStatusCode(403);
            responseDTO.setMessage(e.getMessage());
        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error deleting hotel: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO updateHotel(Long hotelId, MultipartFile photo, String nation, String city, String name, String address, String description) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Hotel hotel = hotelRepo.findById(hotelId)
                    .orElseThrow(() -> new OurException("Hotel Not Found"));

            if (!hotel.getCreator().equals(currentUser)) {
                throw new UnauthorizedAccessException("You are not authorized to update this hotel");
            }

            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
//            Hotel hotel = hotelRepo.findById(hotelId).orElseThrow(() -> new OurException("Hotel Not Found"));
            if (name != null) hotel.setName(name);
            if (address != null) hotel.setAddress(address);
            if (nation != null) hotel.setNation(nation);
            if (city != null) hotel.setCity(city);
            if (description != null) hotel.setDescription(description);
            if (imageUrl != null) hotel.setPhoto(imageUrl);

            Hotel updatedHotel = hotelRepo.save(hotel);
            HotelDTO hotelDTO = Utils.mapHotelEntityToHotelDTO(updatedHotel);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Hotel updated successfully");
            responseDTO.setHotel(hotelDTO);

        } catch (UnauthorizedAccessException e) {
            responseDTO.setStatusCode(403);
            responseDTO.setMessage(e.getMessage());
        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error updating hotel: " + e.getMessage());
        }
        return responseDTO;
    }



    @Override
    public ResponseDTO getHotelById(Long hotelId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepo.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Hotel hotel = hotelRepo.findById(hotelId)
                    .orElseThrow(() -> new OurException("Hotel Not Found"));

            if (!hotel.getCreator().equals(currentUser)) {
                throw new UnauthorizedAccessException("You are not authorized to view this hotel");
            }

            HotelDTO hotelDTO = Utils.mapHotelEntityToHotelDTO(hotel);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Hotel retrieved successfully");
            responseDTO.setHotel(hotelDTO);

        } catch (UnauthorizedAccessException e) {
            responseDTO.setStatusCode(403);
            responseDTO.setMessage(e.getMessage());
        } catch (OurException e) {
            responseDTO.setStatusCode(404);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error retrieving hotel: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public List<String> getAllHotelNames() {
        return hotelRepo.findDistinctHotelNames();
    }
}
