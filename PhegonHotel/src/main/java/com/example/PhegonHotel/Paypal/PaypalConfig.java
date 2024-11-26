//package com.example.PhegonHotel.Paypal;
//
//import com.paypal.core.rest.APIContext;
//import com.paypal.core.rest.OAuthTokenCredential;
//import com.paypal.core.rest.PayPalRESTException;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class PaypalConfig {
//
//    @Value("${paypal.client-id}")
//    private String clientId;
//    @Value("${paypal.client-secret}")
//    private String clientSecret;
//    @Value("${paypal.mode}")
//    private String mode;
//
//    @Bean
//    public APIContext apiContext() throws PayPalRESTException {
//        Map<String, String> sdkConfig = new HashMap<>();
//        sdkConfig.put("mode", mode);
//
//        OAuthTokenCredential oAuthTokenCredential = new OAuthTokenCredential(clientId, clientSecret, sdkConfig);
//        String accessToken = oAuthTokenCredential.getAccessToken();
//
//        APIContext apiContext = new APIContext(accessToken);
//        apiContext.setConfigurationMap(sdkConfig);
//
//        return apiContext;
//    }
//}
