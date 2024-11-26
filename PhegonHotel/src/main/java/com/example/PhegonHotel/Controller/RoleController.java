//package com.example.PhegonHotel.Controller;
//
//import com.example.PhegonHotel.Dto.ResponseDTO;
//import com.example.PhegonHotel.Dto.RoleDTO;
//import com.example.PhegonHotel.Service.Impl.RoleService;
//import com.example.PhegonHotel.Service.Interface.IRoleService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//@RestController
//@RequestMapping("/role")
//public class RoleController {
//
//    @Autowired
//    RoleService roleService;
//
//    @GetMapping("/all")
//    public ResponseEntity<ResponseDTO> getAllRoles() {
//        ResponseDTO responseDTO = roleService.getAllRoles();
//        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ResponseDTO> getRoleById(@PathVariable("id") Long roleId) {
//        ResponseDTO responseDTO = roleService.getRoleById(roleId);
//        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//    }
//
//    @PostMapping("/")
//    public ResponseEntity<ResponseDTO> create(
//            @RequestParam(value = "name", required = false) String name) {
//
//        // Kiểm tra dữ liệu đầu vào
//        if (name == null || name.isBlank()) {
//            ResponseDTO responseDTO = new ResponseDTO();
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage("Vui lòng cung cấp tên vai trò.");
//            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//        }
//
//        // Gọi dịch vụ để thêm vai trò mới
//        ResponseDTO responseDTO = roleService.addNewRole(name);
//        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//    }
//
//
//
//    @DeleteMapping("/delete/{id}")
////    @PreAuthorize("hasAuthority('ADMIN')")
//    public ResponseEntity<ResponseDTO> deleteRoom(@PathVariable Long roleId) {
//        ResponseDTO responseDTO = roleService.deleteRole(roleId);
//        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//
//    }
//
//
//    @PutMapping("/update/{roleId}")
////    @PreAuthorize("hasAuthority('ADMIN')")
//    public ResponseEntity<ResponseDTO> updateRole(
//            @PathVariable Long roleId,
//            @RequestParam(value = "name", required = false) String name) {
//
//        // Kiểm tra dữ liệu đầu vào
//        if (roleId == null || roleId <= 0) {
//            ResponseDTO responseDTO = new ResponseDTO();
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage("ID vai trò không hợp lệ.");
//            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//        }
//
//        if (name == null || name.isBlank()) {
//            ResponseDTO responseDTO = new ResponseDTO();
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage("Vui lòng cung cấp tên vai trò.");
//            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//        }
//
//        // Gọi dịch vụ để cập nhật vai trò
//        ResponseDTO responseDTO = roleService.updateRole(roleId, name);
//        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
//    }
//
//
//
//}
