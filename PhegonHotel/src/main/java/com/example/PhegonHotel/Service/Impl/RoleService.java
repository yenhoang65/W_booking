//package com.example.PhegonHotel.Service.Impl;
//
//import com.example.PhegonHotel.Dto.ResponseDTO;
//import com.example.PhegonHotel.Dto.RoleDTO;
//import com.example.PhegonHotel.Dto.RoomDTO;
//import com.example.PhegonHotel.Entity.Role;
//import com.example.PhegonHotel.Entity.Room;
//import com.example.PhegonHotel.Exception.OurException;
//import com.example.PhegonHotel.Repository.RoleRepo;
//import com.example.PhegonHotel.Service.Interface.IRoleService;
//import com.example.PhegonHotel.Utils.Utils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class RoleService implements IRoleService {
//
//    @Autowired
//    private RoleRepo roleRepo;
//
//
//
//    @Override
//    public ResponseDTO addNewRole(String name) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Tạo một đối tượng Role mới và thiết lập tên
//            Role role = new Role();
//            role.setName(name);
//
//            // Lưu Role vào cơ sở dữ liệu
//            Role savedRole = roleRepo.save(role);
//
//            // Chuyển Role thành RoleDTO
//            RoleDTO roleDTO = Utils.mapRoleEntityToRoleDTO(savedRole);
//
//            // Thiết lập thông tin phản hồi
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("Role added successfully");
//            responseDTO.setRole(roleDTO); // Thiết lập RoleDTO vào ResponseDTO
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error adding role: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//
//    @Override
//    public ResponseDTO updateRole(Long roleId, String name) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Tìm vai trò theo ID
//            Role role = roleRepo.findById(roleId).orElseThrow(() -> new OurException("Role Not Found"));
//
//            // Cập nhật thông tin vai trò
//            if (name != null) {
//                role.setName(name);
//            }
//
//            // Lưu vai trò đã cập nhật
//            Role updatedRole = roleRepo.save(role);
//
//            // Chuyển Role thành RoleDTO
//            RoleDTO roleDTO = Utils.mapRoleEntityToRoleDTO(updatedRole);
//
//            // Thiết lập thông tin phản hồi
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("Role updated successfully");
//            responseDTO.setRole(roleDTO);
//        } catch (OurException e) {
//            responseDTO.setStatusCode(404);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error updating role: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//
//    @Override
//    public ResponseDTO deleteRole(Long id) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Kiểm tra vai trò có tồn tại không
//            if (!roleRepo.existsById(id)) {
//                throw new OurException("Role Not Found");
//            }
//
//            // Xóa vai trò
//            roleRepo.deleteById(id);
//
//            // Thiết lập thông tin phản hồi
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("Role deleted successfully");
//        } catch (OurException e) {
//            responseDTO.setStatusCode(404);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error deleting role: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//
//
//
//    @Override
//    public ResponseDTO getAllRoles() {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            List<Role> roleList = roleRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
//            List<RoleDTO> roleDTOList = Utils.mapRoleListEntityToRoleListDTO(roleList);
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("successful");
//            responseDTO.setRoleList(roleDTOList);
//
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error saving a room " + e.getMessage());
//        }
//        return responseDTO;
//
//    }
//
//
//    @Override
//    public ResponseDTO getRoleById(Long roleId) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            // Tìm vai trò theo ID
//            Role role = roleRepo.findById(roleId).orElseThrow(() -> new OurException("Role Not Found"));
//
//            // Chuyển Role thành RoleDTO
//            RoleDTO roleDTO = Utils.mapRoleEntityToRoleDTO(role);
//
//            // Thiết lập thông tin phản hồi
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("Role fetched successfully");
//            responseDTO.setRole(roleDTO); // Thiết lập RoleDTO vào ResponseDTO
//        } catch (OurException e) {
//            responseDTO.setStatusCode(404);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error fetching role: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//
//
//
//}
