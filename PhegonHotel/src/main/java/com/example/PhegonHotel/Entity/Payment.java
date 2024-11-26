package com.example.PhegonHotel.Entity;

public class Payment {
    private double totalAmount; // Số tiền thanh toán
    private String description; // Mô tả thanh toán

    // Getters và Setters
    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

