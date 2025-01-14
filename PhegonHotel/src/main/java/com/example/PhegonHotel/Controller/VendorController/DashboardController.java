package com.example.PhegonHotel.Controller.VendorController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private IStatisticService statisticService;

    @GetMapping
    public ResponseEntity<ResponseDTO> getDashboardData() {
        ResponseDTO response = statisticService.getDashboardDataForUser();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
