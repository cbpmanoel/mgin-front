export function generateDummyData() {
    function generateProducts() {
        const productList = [];
        for (let i = 0; i < 30; i++) {
            productList.push({
                id: i,
                categoryId: (i % 4) + 1,
                name: `Item ${i}`,
                price: 10.5,
                imageSrc: "https://placehold.co/100x100/orange/white",
            });
        }
        return productList;
    }

    function generateCategories() {
        const categoryList = [];
        for (let i = 0; i < 4; i++) {
            categoryList.push({
                id: i + 1,
                name: `Category ${i + 1}`,
            });
        }
        return categoryList;
    }

    return {
        products: generateProducts(),
        categories: generateCategories(),
    };
}
