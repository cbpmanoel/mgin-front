import { ref } from "vue";
import api from "../utils/api";

export const useCategoryItems = () => {
    const categoryItems = ref([]); // Cache for items by category ID
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
            console.log(`Returning cached data for category ${categoryId}`);
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

                // Validate the response status
                if (response.status !== 200) {
                    throw new Error(
                        `Failed to fetch category items: ${response.status}`,
                    );
                }

                console.log("Response data:", response.data);

                if (!validateJSON(response.data)) {
                    throw new Error("Invalid JSON response");
                }

                // Cache the response data
                categoryItems.value[categoryId] = response.data;
                console.log(
                    `Cached items for category ${categoryId}:`,
                    categoryItems.value[categoryId],
                );

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

        // Validate each item object in the 'data' array
        for (const item of json.data) {
            if (!item || typeof item !== "object") {
                console.error(
                    "Invalid JSON: Each item in 'data' must be an object.",
                );
                return false;
            }

            // Check for required properties
            if (typeof item.category_id !== "number") {
                console.error(
                    `Invalid JSON: 'category_id' must be a number. Found: ${item.category_id}`,
                );
                return false;
            }
            if (typeof item.id !== "number") {
                console.error(
                    `Invalid JSON: 'id' must be a number. Found: ${item.id}`,
                );
                return false;
            }
            if (typeof item.name !== "string") {
                console.error(
                    `Invalid JSON: 'name' must be a string. Found: ${item.name}`,
                );
                return false;
            }
            if (typeof item.image_id !== "string") {
                console.error(
                    `Invalid JSON: 'image_id' must be a string. Found: ${item.image_id}`,
                );
                return false;
            }
            if (typeof item.price !== "number") {
                console.error(
                    `Invalid JSON: 'price' must be a number. Found: ${item.price}`,
                );
                return false;
            }
        }

        // If all checks pass, the JSON is valid
        return true;
    }

    return { categoryItems, isLoading, error, fetchCategoryItems };
};
