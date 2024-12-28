<template>
    <div class="sidepanel">
        <div class="sidepanel-layout">
            <!-- Category section -->
            <div class="sidepanel-container">
                <div class="mb-4 sidepanel-title-area">
                    <object v-html="categoryIco"></object>
                    <h2 class="text-2xl font-semibold">Categories</h2>
                </div>

                <!-- Category buttons are generated dynamically -->
                <CustomButton
                    :color="'gray'"
                    :class="'w-full mb-2 p-2'"
                    @click="scrollTo(category.name)"
                    v-for="category in props.categories"
                    :key="category.id"
                >
                    {{ category.name }}
                </CustomButton>
            </div>

            <!-- Order total section -->
            <div class="sidepanel-container">
                <div class="mb-2 sidepanel-title-area">
                    <object v-html="cartIco"></object>
                    <h2 class="text-2xl font-semibold">Order total</h2>
                </div>
                <div class="grid grid-cols-2 grid-rows-2 gap-2 w-full p-1">
                    <div>Items:</div>
                    <div>{{ props.totalItems }}</div>
                    <div>Total:</div>
                    <div>${{ props.totalPrice.toFixed(2) }}</div>
                </div>
                <div class="mb-2" />
                <CustomButton
                    :color="'gray'"
                    :class="'w-full mb-2 p-2'"
                    @click="proceedToCheckout"
                >
                    Review & Checkout
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import categoryIco from "@/assets/category.svg?raw";
import cartIco from "@/assets/cart.svg?raw";
import CustomButton from "./CustomButton.vue";

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
    /* Content is centered vertically, each element per row -  Width is fixed to 52rem */
    @apply fixed bg-gray-800 text-white h-screen w-52 min-w-52;
}

.sidepanel-layout {
    @apply flex flex-col justify-between h-full;
}

.sidepanel-container {
    @apply flex flex-col items-center p-4;
}

.sidepanel-title-area {
    @apply flex items-center w-full justify-items-start gap-4;
}

.order-info-area {
    @apply grid grid-cols-2 grid-rows-2 gap-2 w-full p-1;
}
</style>
