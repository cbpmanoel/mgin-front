import { ref } from "vue";
import api from "../utils/api";

export const useCategories = () => {
    // State
    const categories = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // Fetch categories from the API
    const fetchCategories = async (retries = 3, delay = 1000) => {
        // Prevent multiple requests
        if (isLoading.value) {
            return;
        }

        // Return cached data
        if (categories.value.length > 0) {
            return;
        }

        // Reset the state
        isLoading.value = true;
        error.value = null;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await api.get("/menu/categories");

                // Validate the response status
                if (response.status !== 200) {
                    throw new Error(
                        `Failed to fetch categories: ${response.status}`,
                    );
                }

                // Cache the response data
                categories.value = response.data;
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

    return { categories, isLoading, error, fetchCategories };
};
