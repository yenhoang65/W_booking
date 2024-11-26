    package com.example.PhegonHotel.Controller.VendorController;


    import com.example.PhegonHotel.Dto.ResponseDTO;
    import com.example.PhegonHotel.Service.Interface.IHotelService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.access.prepost.PreAuthorize;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    @RestController
    @RequestMapping("/vendor/hotel")
    public class HotelController {
        @Autowired
        private IHotelService hotelService;

        @PostMapping("/add")
        @PreAuthorize("hasAuthority('VENDOR')")
        public ResponseEntity<ResponseDTO> addNewHotel(
                @RequestParam(value = "photo", required = false) MultipartFile photo,
                @RequestParam(value = "name", required = false) String name,
                @RequestParam(value = "nation", required = false) String nation,
                @RequestParam(value = "city", required = false) String city,
                @RequestParam(value = "address", required = false) String address,
                @RequestParam(value = "description", required = false) String description
        ) {
            if (
                    photo == null || photo.isEmpty() ||
                    name == null || name.isBlank() ||
                    address == null || address.isBlank() ||
                            nation == null || nation.isBlank() ||
                            city == null || city.isBlank() ||
                    description == null || description.isBlank()) {
                ResponseDTO responseDTO = new ResponseDTO();
                responseDTO.setStatusCode(400);
                responseDTO.setMessage("Vui lòng cung cấp giá trị cho tất cả các trường (hotelPhoto, name, address, description)");
                return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
            }
            System.out.println("photo" +photo);
            System.out.println("name" +name);
            System.out.println("address" +address);
            System.out.println("des" +description);
            ResponseDTO responseDTO = hotelService.addNewHotel(photo, name, nation,city,address, description);

            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }


        @GetMapping("/all")
        public ResponseEntity<ResponseDTO> getAllHotel() {
            ResponseDTO responseDTO = hotelService.getAllHotels();
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }

        @PutMapping("/update/{hotelId}")
        @PreAuthorize("hasAuthority('VENDOR')")
        public ResponseEntity<ResponseDTO> updateHotel(
                @PathVariable Long hotelId,
                @RequestParam(value = "hotelPhoto", required = false) MultipartFile photo,
                @RequestParam(value = "name", required = false) String name,
                @RequestParam(value = "address", required = false) String address,
                @RequestParam(value = "nation", required = false) String nation,
                @RequestParam(value = "city", required = false) String city,
                @RequestParam(value = "description", required = false) String description

        ) {
            ResponseDTO responseDTO = hotelService.updateHotel(hotelId, photo,nation, city,name, address, description);
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }

        @GetMapping("/hotel-by-id/{hotelId}")
        @PreAuthorize("hasAuthority('VENDOR')")
        public ResponseEntity<ResponseDTO> getHotelById(@PathVariable Long hotelId) {
            ResponseDTO responseDTO = hotelService.getHotelById(hotelId);
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }

        @DeleteMapping("/delete/{hotelId}")
        @PreAuthorize("hasAuthority('VENDOR')")
        public ResponseEntity<ResponseDTO> deleteHotel(@PathVariable Long hotelId) {
            ResponseDTO responseDTO = hotelService.deleteHotel(hotelId);
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);

        }
    }
