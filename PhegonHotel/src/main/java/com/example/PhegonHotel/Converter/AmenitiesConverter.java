package com.example.PhegonHotel.Converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class AmenitiesConverter implements AttributeConverter<List<String>, String> {

    @Override
    public String convertToDatabaseColumn(List<String> amenities) {
        if (amenities == null || amenities.isEmpty()) {
            return null;
        }
        return String.join(",", amenities); // Chuyển List thành chuỗi phân cách bởi dấu phẩy
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        return Arrays.stream(dbData.split(","))
                .map(String::trim)
                .collect(Collectors.toList()); // Chuyển chuỗi thành List
    }
}
