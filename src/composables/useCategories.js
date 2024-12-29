import { ref, onMounted } from "vue";

import { generateDummyData } from "@/utils/dummyGenerator";
const { categories: dummy } = generateDummyData();
console.log(dummy);

const categories = ref([]);

export const useCategories = () => {
    // Fetch products from the API
    async function fetchCategories() {
        try {
            const response = await fetch("/api/categories");

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch categories: ${response.status}",
                );
            }

            categories.value = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch categories when the component is mounted
    //onMounted(fetchCategories);
    onMounted(() => {
        categories.value = dummy;
    });

    return { categories, fetchCategories };
};
