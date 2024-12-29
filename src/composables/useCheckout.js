export const useCheckout = () => {
    const checkout = async (cartItems) => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartItems),
            });

            if (!response.ok) {
                console.error("Failed to checkout", response.statusText);
                throw new Error("Failed to checkout");
            }

            console.log("Checkout successful");
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Error during checkout", error);
        }
    };

    return { checkout };
};
