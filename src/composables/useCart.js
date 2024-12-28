import { ref } from "vue";

const generateProducts = () => {
    const productList = ref([]);
    for (let i = 0; i < 30; i++) {
        productList.value.push({
            id: i,
            categoryId: (i % 4) + 1,
            name: `Item ${i}`,
            price: 10.5,
            imageSrc: "https://placehold.co/100x100/orange/white",
        });
    }
    return productList;
};

const generateCategories = () => {
    const categoryList = ref([]);
    for (let i = 0; i < 4; i++) {
        categoryList.value.push({
            id: i + 1,
            name: `Category ${i + 1}`,
        });
    }
    return categoryList;
};

export const useCategories = () => {
    const categories = generateCategories();
    return { categories };
};

export const useCart = () => {
    const cart = generateProducts();
    return { cart };
};
