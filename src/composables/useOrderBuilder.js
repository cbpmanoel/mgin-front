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
            price_at_order: item.price, // Assuming price_at_order is the same as the item's price
        }));

        // Map payment to PaymentCardModel structure
        let mappedPayment = {};
        if (payment.type === "card") {
            mappedPayment = {
                type: payment.type,
                // Calculate the total amount based on the items
                amount: mappedItems.reduce(
                    (total, item) =>
                        total + item.price_at_order * item.quantity,
                    0,
                ),
                card_number: payment.cardNumber,
                card_holder: payment.cardHolder,
                expiration_date: payment.expirationDate,
                cvv: payment.cvv,
            };
        } else {
            throw new Error("Unsupported payment type");
        }

        // Build the OrderModel structure
        const order = {
            total: mappedPayment.amount,
            created_at: new Date().toISOString(),
            items: mappedItems,
            payment: mappedPayment,
        };

        return order;
    };

    return { buildOrder };
};
