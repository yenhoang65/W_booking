package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.CreatePaymentMethodTransferRequest;
import com.example.PhegonHotel.Entity.Booking;
import com.example.PhegonHotel.Entity.Hotel;
import com.example.PhegonHotel.Entity.Room;
import com.example.PhegonHotel.Entity.User;
import com.example.PhegonHotel.Repository.BookingRepo;
import com.example.PhegonHotel.Repository.HotelRepo;
import com.example.PhegonHotel.Repository.RoomRepo;
import com.example.PhegonHotel.Repository.UserRepo;
import com.example.PhegonHotel.Service.Interface.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private static String VNP_VERSION = "2.1.0";
    private static String VNP_COMMAND = "2.1.0";
    private static String VNP_TMN_CODE = "11CG57AD";
    private static String VNP_HASH_SECRET = "OOVYIJVYUBGEZMREEZTJRFKHSLGVTJSE";
    private static String VNP_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private static String VNP_REFUND_URL = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
    private static String VNP_BANK_CODE = "";
    private static String VNP_CURR_CODE = "VND";
    private static String VNP_LOCALE = "vn";
    private static String VNP_RETURN_URL_BUY_ONLINE = "http://localhost:5173"; // TODO chuyển trang khi thành công
    private final BookingRepo bookingRepo;
    private final RoomRepo roomRepo;
    private final UserRepo userRepo;
    private final HotelRepo hotelRepo;



    @Transactional
    public String paymentMethodWithVNPAY(CreatePaymentMethodTransferRequest payModel,
                                         HttpServletRequest request) throws UnsupportedEncodingException {

        Optional<User> optionalUser = userRepo.findById(Long.valueOf(payModel.getUserId()));
        Optional<Room> optionalRoom = roomRepo.findById(Long.valueOf(payModel.getRoomId()));
        Optional<Hotel> optionalHotel = hotelRepo.findById(Long.valueOf(payModel.getHotelId()));

        Booking booking = new Booking();
        booking.setCheckInDate(LocalDate.parse(payModel.getBookingRequest().getFormattedCheckInDate(), DateTimeFormatter.ofPattern("yyyy-dd-MM")));
        booking.setCheckOutDate(LocalDate.parse(payModel.getBookingRequest().getFormattedCheckOutDate(), DateTimeFormatter.ofPattern("yyyy-dd-MM")));
        booking.setRoom(optionalRoom.get());
        booking.setHotel(optionalHotel.get());
        booking.setUser(optionalUser.get());
        booking.setTotalPrice(new BigDecimal(payModel.vnpAmmount));
        booking.setNumOfAdults(Integer.valueOf(payModel.getBookingRequest().getNumOfAdults()));
        booking.setNumOfChildren(Integer.valueOf(payModel.getBookingRequest().getNumOfChildren()));
        booking.setBookingConfirmationCode("P"+RandomStringUtils.randomNumeric(6));
        booking.setStatus("Thành công");
        bookingRepo.save(booking);


        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDateTime expireTime = now.plusMinutes(15);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String vnp_CreateDate = now.format(formatter);
        String vnp_ExpireDate = expireTime.format(formatter);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNP_VERSION);
        vnp_Params.put("vnp_Command", VNP_COMMAND);
        vnp_Params.put("vnp_TmnCode", VNP_TMN_CODE);
        vnp_Params.put("vnp_Amount", payModel.vnpAmmount + "00");
        vnp_Params.put("vnp_BankCode", VNP_BANK_CODE);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_CurrCode", VNP_CURR_CODE);
        vnp_Params.put("vnp_IpAddr", getIpAddress(request));
        vnp_Params.put("vnp_Locale", VNP_LOCALE);
        vnp_Params.put("vnp_OrderInfo", payModel.vnpOrderInfo);
        vnp_Params.put("vnp_OrderType", payModel.vnpOrderType);
        vnp_Params.put("vnp_ReturnUrl", VNP_RETURN_URL_BUY_ONLINE);
        vnp_Params.put("vnp_TxnRef", "HD" + RandomStringUtils.randomNumeric(6) + "-" + vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldList = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldList);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator itr = fieldList.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if (itr.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }

        String queryUrl = query.toString();
        String vnp_SecureHash = hmacSHA512(VNP_HASH_SECRET, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNP_URL + "?" + queryUrl;
        return paymentUrl;
    }

    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static boolean decodeHmacSha512(String message, String base64EncodedHmac, String secretKey) {
        String hashDataServer = hmacSHA512(secretKey, message);
        // So sánh HMAC tính toán với HMAC nhận được
        if (hashDataServer.equals(base64EncodedHmac)) {
            return true;
        } else {
            return false;
        }
    }


    public static String getIpAddress(HttpServletRequest request) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }
}

