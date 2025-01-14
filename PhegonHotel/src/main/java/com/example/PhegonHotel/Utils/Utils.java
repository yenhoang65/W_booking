package com.example.PhegonHotel.Utils;

import com.example.PhegonHotel.Dto.*;

import com.example.PhegonHotel.Entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.security.SecureRandom;

public class Utils {
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final SecureRandom secureRandom = new SecureRandom();


    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    public static String generateOtp(int length) {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(random.nextInt(6)); // Tạo số ngẫu nhiên từ 0-6
        }
        return otp.toString();
    }

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setUsername(user.getUsername());
        userDTO.setPhoto(user.getPhoto());
        userDTO.setEmail(user.getEmail());
        userDTO.setNameShop(user.getNameShop());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static HotelDTO mapHotelEntityToHotelDTO(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(hotel.getId());
        hotelDTO.setPhoto(hotel.getPhoto());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setAddress(hotel.getAddress());
        hotelDTO.setCity(hotel.getCity());
        hotelDTO.setNation(hotel.getNation());
        hotelDTO.setDescription(hotel.getDescription());
        return hotelDTO;
    }

    public static AmenitiesDTO mapAmenitiesEntityToAmenitiesDTO(Amenities amenities) {
        AmenitiesDTO amenitiesDTO = new AmenitiesDTO();
        amenitiesDTO.setId(amenities.getId());
        amenitiesDTO.setNameAmenities(amenities.getNameAmenities());
        return amenitiesDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setStatus(room.getStatus());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());
        roomDTO.setHotel(mapHotelEntityToHotelDTO(room.getHotel()));
        if (room.getHotel() != null) {
            HotelDTO hotelDTO = new HotelDTO();
            hotelDTO.setId(room.getHotel().getId());
            hotelDTO.setName(room.getHotel().getName());
            hotelDTO.setNation(room.getHotel().getNation());
            hotelDTO.setAddress(room.getHotel().getAddress());
            hotelDTO.setCity(room.getHotel().getCity());
            roomDTO.setHotel(hotelDTO);
        }
        if (room.getAmenities() != null && !room.getAmenities().isEmpty()) {
            List<String> amenitiesList = new ArrayList<>(room.getAmenities());
            roomDTO.setAmenities(amenitiesList);
        }

        return roomDTO;
    }

//    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
//        BookingDTO bookingDTO = new BookingDTO();
//        // Map simple fields
//        bookingDTO.setId(booking.getId());
//        bookingDTO.setCheckInDate(booking.getCheckInDate());
//        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
//        bookingDTO.setTotalPrice(booking.getTotalPrice());
//        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
//        bookingDTO.setStatus(booking.getStatus());
//        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
//        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
//        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
//        return bookingDTO;
//    }

    public static RoomDTO mapRoomEntityToRoomDTOPlusHotel(Room room) {
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());

        if (room.getHotel() != null) {
            HotelDTO hotelDTO = mapHotelEntityToHotelDTO(room.getHotel());
            roomDTO.setHotel(hotelDTO); // Gán HotelDTO vào RoomDTO
        }

        return roomDTO;
    }

    public static HotelDTO mapHotelEntityHotelDTOPlusRooms(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();

        // Chuyển đổi các thuộc tính cơ bản của Hotel
        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setAddress(hotel.getAddress());
        hotelDTO.setDescription(hotel.getDescription());
        hotelDTO.setPhoto(hotel.getPhoto());

        // Chuyển đổi danh sách Room sang RoomDTO
        if (hotel.getRooms() != null) {
            hotelDTO.setRooms(hotel.getRooms().stream()
                    .map(Utils::mapRoomEntityToRoomDTO)
                    .collect(Collectors.toList()));
        }

        return hotelDTO;
    }

    public static HotelDTO mapHotelEntityHotelDTOPlusUser(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();
        // Chuyển đổi các thuộc tính cơ bản của Hotel
        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setAddress(hotel.getAddress());
        hotelDTO.setDescription(hotel.getDescription());
        hotelDTO.setPhoto(hotel.getPhoto());

        // Chuyển đổi creator (User) nếu cần
        if (hotel.getCreator() != null) {
            hotelDTO.setCreator(Utils.mapUserEntityToUserDTO(hotel.getCreator()));
        }

        return hotelDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        // Map các thuộc tính đơn giản của Booking
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());

        // Map thông tin phòng (Room) nếu có
        if (booking.getRoom() != null) {
            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setId(booking.getRoom().getId());
            roomDTO.setRoomType(booking.getRoom().getRoomType());
            roomDTO.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDTO.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            roomDTO.setRoomDescription(booking.getRoom().getRoomDescription());
            bookingDTO.setRoom(roomDTO);
        }

        // Map thông tin (hotel) nếu có
        if (booking.getHotel() != null) {
            HotelDTO hotelDTO = new HotelDTO();
            hotelDTO.setId(booking.getHotel().getId());
            hotelDTO.setPhoto(booking.getHotel().getPhoto());
            hotelDTO.setAddress(booking.getHotel().getAddress());
            hotelDTO.setDescription(booking.getHotel().getDescription());
            hotelDTO.setName(booking.getHotel().getName());
            bookingDTO.setHotel(hotelDTO);
        }

        // Map thông tin người dùng (User) nếu có
        if (booking.getUser() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(booking.getUser().getId());
            userDTO.setName(booking.getUser().getName());
            userDTO.setEmail(booking.getUser().getEmail());
            userDTO.setPhoneNumber(booking.getUser().getPhoneNumber());
            bookingDTO.setUser(userDTO);
        }

        return bookingDTO;
    }


    public static RoomDTO mapRoomEntityToRoomDTOPlusBookings(Room room) {
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());

        if (room.getBookings() != null) {
            roomDTO.setBookings(room.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return roomDTO;
    }



    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {

        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if (mapUser) {
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            RoomDTO roomDTO = new RoomDTO();

            roomDTO.setId(booking.getRoom().getId());
            roomDTO.setRoomType(booking.getRoom().getRoomType());
            roomDTO.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDTO.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            roomDTO.setRoomDescription(booking.getRoom().getRoomDescription());
            bookingDTO.setRoom(roomDTO);
        }
        return bookingDTO;
    }


    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false)).collect(Collectors.toList()));
        }
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<HotelDTO> mapHotelListEntityToHotelListDTO(List<Hotel> hotelList) {
        return hotelList.stream().map(Utils::mapHotelEntityToHotelDTO).collect(Collectors.toList());
    }

    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }


    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

}
