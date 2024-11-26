import api from "../../service/ApiService.js";

export class ApiPayment {

    static paymentVNPAY(request) {
        return api({
            method: "POST",
            url: "/payment/payment-vnpay",
            data: request,
        });
    }

}