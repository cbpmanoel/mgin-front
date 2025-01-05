import { ref } from "vue";
import api from "../utils/api";

export const useCheckout = () => {
    const isLoading = ref(false);
    const error = ref(null);

    const checkout = async (
        cartItems,
        paymentMethod,
        retries = 3,
        delay = 1000,
    ) => {
        // Prevent multiple requests
        if (isLoading.value) {
            return;
        }

        // Reset the state
        isLoading.value = true;
        error.value = null;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await api.post("/api/checkout", {
                    cartItems,
                    paymentMethod,
                });

                // Validate the response status
                if (response.status !== 200) {
                    throw new Error(
                        `Failed to checkout: ${response.statusText}`,
                    );
                }

                console.log("Checkout successful", response.data);
                break;
            } catch (e) {
                console.error(`Attempt ${attempt + 1} failed:`, e);
                error.value = `Attempt ${attempt + 1}: ${e.message}`;

                // Exit if there are no more retries
                if (attempt === retries - 1) {
                    break;
                }

                await new Promise((resolve) => setTimeout(resolve, delay));
            } finally {
                isLoading.value = false;
            }
        }
    };

    return { isLoading, error, checkout };
};
