package com.example.PhegonHotel.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    private String formattedCheckInDate;
    private String formattedCheckOutDate;
    private String numOfAdults;
    private String numOfChildren;
}
