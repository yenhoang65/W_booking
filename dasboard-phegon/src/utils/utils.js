export const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

// Hàm để giới hạn số ký tự
export const limitText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    } else {
        return text;
    }
};

export const limitTextDes = (text, limit) => {
    const plainText = text.replace(/<[^>]*>/g, "");

    if (plainText.length <= limit) {
        return text;
    }

    return text.slice(0, limit) + "..."; // Thêm "..." vào cuối
};
