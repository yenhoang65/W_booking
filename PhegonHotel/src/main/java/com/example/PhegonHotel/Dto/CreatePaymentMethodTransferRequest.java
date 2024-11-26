package com.example.PhegonHotel.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreatePaymentMethodTransferRequest {
    public String vnpAmmount ;
    public String vnpOrderInfo = "Thanh toan hoa don";
    public String vnpOrderType = "Thanh toan hoa don";

    public String userId ;
    public String roomId ;
    public String hotelId ;
    public BookingRequest bookingRequest ;

}
