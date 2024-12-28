<template>
    <!-- Sidebar: Categories -->
    <div class="sidebar">
        <div class="sidebar-layout">
            <div class="sidebar-container">
                <div class="mb-4 sidebar-title-area">
                    <object v-html="categoryIco"></object>
                    <h2 class="text-2xl font-semibold">Categories</h2>
                </div>
                <button
                    @click="scrollTo(category.name)"
                    class="w-full mb-2"
                    v-for="category in categories"
                    :key="category.id"
                >
                    {{ category.name }}
                </button>
            </div>

            <div class="sidebar-container">
                <div class="mb-2 sidebar-title-area">
                    <object v-html="cartIco"></object>
                    <h2 class="text-2xl font-semibold">Order total</h2>
                </div>
                <div>Items: {{ totalItems }}</div>
                <div>Total: ${{ totalPrice.toFixed(2) }}</div>
                <div class="mb-2" />
                <button @click="proceedToCheckout()">Review & Checkout</button>
            </div>
        </div>
    </div>

    <!-- Main content: Products separated by category -->
    <div
        v-for="category in productList"
        :key="category.category"
        class="main-content"
        :ref="setCategoryRef(category.category)"
    >
        <div v-if="category.items.length > 0" class="mb-10">
            <!-- Item cards -->
            <BaseContainer :title="category.category">
                <ItemCard
                    v-for="item in category.items"
                    :key="item.id"
                    :id="item.id"
                    :categoryId="item.categoryId"
                    :description="item.name"
                    :price="item.price"
                    :imageSrc="item.imageSrc"
                />
            </BaseContainer>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ItemCard from "@/components/ItemCard.vue";
import BaseContainer from "@/components/BaseContainer.vue";
import { useCart, useCategories } from "@/composables/useCart";
import cartIco from "@/assets/cart.svg?raw";
import categoryIco from "@/assets/category.svg?raw";

const { cart } = useCart();
const { categories } = useCategories();

// Create refs for total items and total price
// May be used in the future for a checkout page
const totalItems = ref(0);
const totalPrice = ref(0);

// Create a ref object to hold category refs
const categoryRefs = ref({});

// Group items by category
const productList = computed(() => {
    return categories.value.map((category) => {
        return {
            category: category.name,
            items: cart.value.filter((item) => item.categoryId === category.id),
        };
    });
});

// Store the DOM element in the refs object, needed for scrolling
const setCategoryRef = (category) => (el) => {
    if (el) {
        categoryRefs.value[category] = el;
    }
};

// Scroll to the category section
const scrollTo = (category) => {
    const element = categoryRefs.value[category];
    element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
.sidebar {
    /* Content is centered vertically, each element per row */
    @apply fixed bg-gray-600 text-white h-screen w-[20%] min-w-[20%];
}

.sidebar-layout {
    @apply flex flex-col justify-between h-full;
}

.sidebar-container {
    @apply flex flex-col items-center p-4;
}

.sidebar-title-area {
    @apply flex items-center w-full justify-evenly;
}

.sidebar-container button {
    @apply bg-gray-800 text-white p-2 rounded-md w-full;
}

.main-content {
    @apply justify-center items-center w-[80%] ml-[20%] p-4;
}
</style>
