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
                if (!validateJSON(response.data)) {
                    throw new Error("Invalid JSON response");
                }

                console.log("Categories fetched:", response.data.data.length);

                categories.value = response.data.data;
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

    function validateJSON(json) {
        // Validate the root object
        if (!json || typeof json !== "object" || !json.data) {
            console.error(
                "Invalid JSON: Root object must contain a 'data' property.",
            );
            return false;
        }

        // Validate that 'data' is an array
        if (!Array.isArray(json.data)) {
            console.error("Invalid JSON: 'data' must be an array.");
            return false;
        }

        // Validate each category object in the 'data' array
        for (const category of json.data) {
            if (!category || typeof category !== "object") {
                console.error(
                    "Invalid JSON: Each item in 'data' must be an object.",
                );
                return false;
            }

            // Check for required properties
            if (typeof category.id !== "number") {
                console.error(
                    `Invalid JSON: 'id' must be a number. Found: ${category.id}`,
                );
                return false;
            }
            if (typeof category.name !== "string") {
                console.error(
                    `Invalid JSON: 'name' must be a string. Found: ${category.name}`,
                );
                return false;
            }
            if (typeof category.image_id !== "string") {
                console.error(
                    `Invalid JSON: 'image_id' must be a string. Found: ${category.image_id}`,
                );
                return false;
            }
        }

        // If all checks pass, the JSON is valid
        return true;
    }

    return { categories, isLoading, error, fetchCategories };
};
