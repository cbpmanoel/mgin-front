import { ref, onMounted } from "vue";
import { generateDummyData } from "@/utils/dummyGenerator";

const { products: dummy } = generateDummyData();
console.log(dummy);

const products = ref([]);

export const useProducts = () => {
    // Fetch products from the API
    async function fetchProducts() {
        try {
            const response = await fetch("/api/products");

            if (!response.ok) {
                throw new Error("Failed to fetch products: ${response.status}");
            }

            products.value = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch products when the component is mounted
    //onMounted(fetchProducts);
    onMounted(() => {
        products.value = dummy;
    });

    return { products, fetchProducts };
};
