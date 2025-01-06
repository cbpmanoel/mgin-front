import { ref } from "vue";
import api from "../utils/api";

// State
const categories = ref([]);
const isLoading = ref(false);
const error = ref(null);

export const useCategories = () => {

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
                const validCategories = validateJSON(response.data);

                // Validate the JSON response
                if (validCategories === null) {
                    throw new Error("Invalid JSON response");
                }

                console.log("Categories fetched:", validCategories.length);
                categories.value = validCategories;

                // Exit the loop if the data is valid
                break;
            } catch (e) {
                console.error(`Attempt ${attempt + 1} failed:`, e);
                error.value = `Attempt ${attempt + 1}: ${e.message}`;

                console.log("Retrying in 1 second...");
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }

        // Reset the loading state
        isLoading.value = false;
    };

    function validateJSON(json) {
        // Ensure the root object and `data` property exist and are an array
        if (!json || typeof json !== "object" || !Array.isArray(json.data)) {
            console.error(
                "Invalid JSON: Root object must contain a 'data' array.",
            );

            // Return null if the JSON is invalid
            return null;
        }

        // Filter valid categories
        const validCategories = json.data.filter((category) => {
            if (
                category &&
                typeof category === "object" &&
                typeof category.id === "number" &&
                typeof category.name === "string" &&
                typeof category.image_id === "string"
            ) {
                return true;
            } else {
                console.error("Invalid category found:", category);
                return false;
            }
        });

        return validCategories;
    }

    return { categories, isLoading, error, fetchCategories };
};
