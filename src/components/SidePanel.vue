<template>
    <div class="sidepanel">
        <div class="sidepanel-layout">
            <!-- Category section -->
            <div class="sidepanel-container">
                <div class="mb-4 sidepanel-title-area">
                    <object v-html="categoryIco"></object>
                    <h2 class="text-2xl font-semibold">Categories</h2>
                </div>
                <button
                    @click="scrollTo(category.name)"
                    class="w-full mb-2"
                    v-for="category in props.categories"
                    :key="category.id"
                >
                    {{ category.name }}
                </button>
            </div>

            <!-- Order total section -->
            <div class="sidepanel-container">
                <div class="mb-2 sidepanel-title-area">
                    <object v-html="cartIco"></object>
                    <h2 class="text-2xl font-semibold">Order total</h2>
                </div>
                <div>Items: {{ props.totalItems }}</div>
                <div>Total: ${{ props.totalPrice.toFixed(2) }}</div>
                <div class="mb-2" />
                <button @click="proceedToCheckout()">Review & Checkout</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import categoryIco from "@/assets/category.svg?raw";
import cartIco from "@/assets/cart.svg?raw";

const props = defineProps({
    categories: {
        type: Array,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

// Emit events to parent component
const emit = defineEmits(["scroll-to", "proceed-to-checkout"]);

const scrollTo = (category) => {
    emit("scroll-to", category);
};

const proceedToCheckout = () => {
    emit("proceed-to-checkout");
};
</script>

<style scoped>
.sidepanel {
    /* Content is centered vertically, each element per row */
    @apply fixed bg-gray-800 text-white h-screen w-[20%] min-w-[20%];
}

.sidepanel-layout {
    @apply flex flex-col justify-between h-full;
}

.sidepanel-container {
    @apply flex flex-col items-center p-4;
}

.sidepanel-title-area {
    @apply flex items-center w-full justify-evenly;
}

.sidepanel-container button {
    @apply bg-gray-600 text-white p-2 rounded-md w-full;
}
</style>
