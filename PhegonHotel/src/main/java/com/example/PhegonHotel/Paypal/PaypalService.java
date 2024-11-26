//package com.example.PhegonHotel.Paypal;
//
//import com.example.PhegonHotel.Entity.Payment;
//import com.paypal.core.rest.APIContext;
//import com.paypal.core.rest.PayPalRESTException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class PaypalService {
//    private final APIContext apiContext;
//
//    public Payment createPayment(
//            Double total,
//            String currency,
//            String method,
//            String intent,
//            String description,
//            String cancelUrl,
//            String successUrl
//    ) throws PayPalRESTException {
//        // Sử dụng class Amount từ SDK chính xác
//        Amount amount = new Amount();
//        amount.setCurrency(currency);
//        amount.setTotal(String.format(Locale.US, "%.2f", total)); // Sử dụng format phù hợp với Locale của USD hoặc EUR
//
//        Transaction transaction = new Transaction();
//        transaction.setDescription(description);
//        transaction.setAmount(amount);
//
//        List<Transaction> transactions = new ArrayList<>();
//        transactions.add(transaction);
//
//        Payer payer = new Payer();
//        payer.setPaymentMethod(method);
//
//        Payment payment = new Payment();
//        payment.setIntent(intent);
//        payment.setPayer(payer);
//        payment.setTransactions(transactions);
//
//        RedirectUrls redirectUrls = new RedirectUrls();
//        redirectUrls.setCancelUrl(cancelUrl);
//        redirectUrls.setReturnUrl(successUrl);
//
//        payment.setRedirectUrls(redirectUrls);
//
//        // Tạo Payment bằng APIContext
//        return payment.create(apiContext);
//    }
//
//    public Payment executePayment(
//            String paymentId,
//            String payerId
//    ) throws PayPalRESTException {
//        Payment payment = new Payment();
//        payment.setId(paymentId);
//
//        PaymentExecution paymentExecution = new PaymentExecution();
//        paymentExecution.setPayerId(payerId);
//
//        // Thực thi Payment
//        return payment.execute(apiContext, paymentExecution);
//    }
//}
