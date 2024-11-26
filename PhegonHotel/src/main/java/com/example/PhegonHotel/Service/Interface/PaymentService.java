package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.CreatePaymentMethodTransferRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;

public interface PaymentService {

    String paymentMethodWithVNPAY(CreatePaymentMethodTransferRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException;

}
