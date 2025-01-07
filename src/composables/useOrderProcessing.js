import { ref } from "vue";
import api from "../utils/api";

export const useOrderProcessing = () => {
    const isLoading = ref(false);
    const error = ref(null);
    const orderId = ref(null);

    const processOrder = async (orderObject, retries = 3, delay = 1000) => {
        // Prevent multiple requests
        if (isLoading.value) {
            return;
        }

        // Reset the state
        isLoading.value = true;
        error.value = null;
        orderId.value = null;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                // Send the order to the API
                const response = await api.post("/order", orderObject);

                // Validate the response status
                if (response.status !== 200) {
                    throw new Error(
                        `Failed to process order: ${response.statusText}`,
                    );
                }

                console.log(`Order ID: ${response.data.order_id}`);

                // Cache the order ID
                orderId.value = response.data.order_id;

                // Exit the loop if the data is valid
                break;
            } catch (e) {
                console.error(`Attempt ${attempt + 1} failed:`, e);
                error.value = `Attempt ${attempt + 1}: ${e.message}`;

                console.log("Retrying in 1 second...");
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }

        isLoading.value = false;
    };

    return { isLoading, error, orderId, processOrder };
};
