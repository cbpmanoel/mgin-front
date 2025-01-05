import { ref } from "vue";
import api from "../utils/api";

export const useCategoryItems = () => {
    const categoryItems = ref({}); // Cache for items by category ID
    const isLoading = ref(false);
    const error = ref(null);

    // Fetch menu items from the API by category ID
    const fetchCategoryItems = async (
        categoryId,
        retries = 3,
        delay = 1000,
    ) => {
        // Handle missing categoryId
        if (!categoryId) {
            throw new Error("CategoryId is required");
        }

        // Prevent multiple requests
        if (isLoading.value) {
            return;
        }

        // Return cached data
        if (categoryItems.value[categoryId]?.length > 0) {
            return;
        }

        // Reset the state
        isLoading.value = true;
        error.value = null;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await api.get(
                    `/menu/categories/${categoryId}`,
                );

                // Cache the response data
                categoryItems.value[categoryId] = response.data;
                break;
            } catch (e) {
                console.error(
                    `Attempt ${attempt + 1} failed for category ${categoryId}:`,
                    e,
                );
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

    return { categoryItems, isLoading, error, fetchCategoryItems };
};
