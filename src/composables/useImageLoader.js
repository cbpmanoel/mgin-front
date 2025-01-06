import { ref, onUnmounted } from "vue";
import api from "../utils/api";

export const useImageLoader = () => {
    // State
    const imageCache = ref({});
    const error = ref(null);

    // Load an image from the server
    const loadImage = async (imageId, retries = 3, delay = 1000) => {
        // Handle missing imageId
        if (!imageId) {
            throw new Error("Image ID is required");
        }

        // Return cached image if it exists
        if (imageCache.value[imageId]?.url) {
            return imageCache.value[imageId].url;
        }

        // Prevent multiple requests
        if (imageCache.value[imageId]?.isLoading) {
            return;
        }

        // Reset the state
        imageCache.value[imageId] = { isLoading: true, url: null };

        // Fetch the image from the server
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                // Create the endpoint URL for the image
                const endpoint = `images/${imageId}.jpg`;

                // Fetch the image from the server
                const response = await api.get(endpoint, {
                    responseType: "blob",
                });

                // Validate the response status
                if (response.status !== 200) {
                    throw new Error(
                        `Failed to fetch image: ${response.status}`,
                    );
                }

                const blob = response.data;
                const imageObjectUrl = URL.createObjectURL(blob);

                // Cache the image and return the URL
                imageCache.value[imageId] = {
                    isLoading: false,
                    url: imageObjectUrl,
                };

                // Return the image URL
                return imageObjectUrl;
            } catch (e) {
                console.error(`Attempt ${attempt + 1} failed:`, e);
                error.value = `Attempt ${attempt + 1}: ${e.message}`;

                console.log("Retrying in 1 second...");
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }

        // Reset the loading state
        imageCache.value[imageId] = { isLoading: false, url: null };
        return null;
    };

    onUnmounted(() => {
        for (const imageId in imageCache.value) {
            const cached = imageCache.value[imageId];
            if (cached?.url) {
                URL.revokeObjectURL(cached.url);
            }
        }
    });

    return { loadImage, error };
};
