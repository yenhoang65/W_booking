package com.example.PhegonHotel.Dto;

import lombok.Getter;
import lombok.Setter;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Setter
@Getter
public class PaymentVnpayResponse {
    private String vnpAmount;
    private String vnpBankCode;
    private String vnpBankTranNo;
    private String vnpCardType;
    private String vnpOrderInfo;
    private String vnpPayDate;
    private String vnpResponseCode;
    private String vnpTmnCode;
    private String vnpTransactionNo;
    private String vnpTransactionStatus;
    private String vnpTxnRef;
    private String vnpSecureHash;

    public String toParamsString() {
        return "vnp_Amount=" + setParam(vnpAmount) +
                "&vnp_BankCode=" + setParam(vnpBankCode) +
                "&vnp_BankTranNo=" + setParam(vnpBankTranNo) +
                "&vnp_CardType=" + setParam(vnpCardType) +
                "&vnp_OrderInfo=" + setParam(vnpOrderInfo) +
                "&vnp_PayDate=" + setParam(vnpPayDate) +
                "&vnp_ResponseCode=" + setParam(vnpResponseCode) +
                "&vnp_TmnCode=" + setParam(vnpTmnCode) +
                "&vnp_TransactionNo=" + setParam(vnpTransactionNo) +
                "&vnp_TransactionStatus=" + setParam(vnpTransactionStatus) +
                "&vnp_TxnRef=" + setParam(vnpTxnRef);
    }

    public String setParam(String param){
        try {
            return URLEncoder.encode(param, StandardCharsets.US_ASCII.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
