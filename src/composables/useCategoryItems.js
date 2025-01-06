import { ref } from "vue";
import api from "../utils/api";

// State
const categoryItems = ref([]);
const isLoading = ref(false);
const error = ref(null);

export const useCategoryItems = () => {
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

                const validCategoryItems = validateJSON(response.data);
                if (validCategoryItems === null) {
                    throw new Error("Invalid JSON response");
                }

                // Cache the response data
                categoryItems.value[categoryId] = validCategoryItems;
                console.log(
                    `Cached ${categoryItems.value[categoryId].length} items for category ${categoryId}`,
                );

                // Exit the loop if the data is valid
                break;
            } catch (e) {
                console.error(
                    `Attempt ${attempt + 1} failed for category ${categoryId}:`,
                    e,
                );
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
            // Return null to indicate an invalid JSON response
            return null;
        }

        // Filter valid items
        const validItems = json.data.filter((item) => {
            if (
                item &&
                typeof item === "object" &&
                typeof item.category_id === "number" &&
                typeof item.id === "number" &&
                typeof item.name === "string" &&
                typeof item.image_id === "string" &&
                typeof item.price === "number"
            ) {
                return true;
            } else {
                console.error("Invalid item found:", item);
                return false;
            }
        });

        // Return the valid items or an empty array
        return validItems;
    }

    return { categoryItems, isLoading, error, fetchCategoryItems };
};
