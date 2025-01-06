export const useOrderBuilder = () => {
    // Build an order object from items and payment, based on the OrderModel structure of the backend
    const buildOrder = (items, payment) => {
        // Map items to ItemOnOrderModel structure
        const mappedItems = Object.values(items).map((item) => ({
            item: {
                category_id: item.categoryId,
                id: item.id,
                name: item.name,
                image_id: item.imageSrc,
                price: item.price,
            },
            quantity: item.quantity,
        }));

        // Map payment to PaymentCardModel structure
        let mappedPayment = {};
        if (payment.type === "card") {
            mappedPayment = {
                type: payment.type,
                amount: payment.amount,
                card_number: payment.cardNumber,
                card_holder: payment.cardHolderName,
                expiration_date: `${payment.expirationMonth}/${payment.expirationYear}`,
                cvv: payment.cvv,
            };
        } else {
            throw new Error("Unsupported payment type");
        }

        // Build the OrderModel structure
        const order = {
            total: payment.amount,
            created_at: new Date().toISOString(),
            items: mappedItems,
            payment: mappedPayment,
        };

        return order;
    };

    return { buildOrder };
};
