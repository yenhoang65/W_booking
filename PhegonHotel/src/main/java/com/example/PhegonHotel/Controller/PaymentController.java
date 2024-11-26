package com.example.PhegonHotel.Controller;

import com.example.PhegonHotel.Dto.CreatePaymentMethodTransferRequest;
import com.example.PhegonHotel.Dto.PaymentVnpayResponse;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.security.Principal;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/payment-vnpay")
    public ResponseEntity<String> paymentVNPAY(@RequestBody CreatePaymentMethodTransferRequest payModel,
                                               HttpServletRequest request) throws UnsupportedEncodingException {
        return new ResponseEntity<>(paymentService.paymentMethodWithVNPAY(payModel, request),HttpStatus.OK);
    }

}
