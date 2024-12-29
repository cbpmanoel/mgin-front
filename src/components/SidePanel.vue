<template>
    <div class="sidepanel">
        <div class="sidepanel-layout">
            <!-- Category section -->
            <div class="sidepanel-container">
                <div class="mb-4 sidepanel-title-area">
                    <object v-html="categoryIco" v-once />
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
                    <object v-html="cartIco" v-once />
                    <h2 class="text-2xl font-semibold">Order total</h2>
                </div>
                <div class="grid w-full grid-cols-2 grid-rows-2 gap-2 p-1 mb-2">
                    <div class="text-lg font-semibold cell-center-left">
                        Items:
                    </div>
                    <div class="text-lg cell-center-right">
                        {{ props.totalItems }}
                    </div>
                    <div class="text-lg font-semibold cell-center-left">
                        Total:
                    </div>
                    <div class="text-lg cell-center-right">
                        ${{ props.totalPrice.toFixed(2) }}
                    </div>
                </div>
                <CustomButton
                    :color="'green'"
                    :class="'w-full p-2'"
                    :content-align="'evenly'"
                    @click="navigateToCart"
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
const emit = defineEmits(["scroll-to", "navigate-to-cart"]);

const scrollTo = (category) => {
    emit("scroll-to", category);
};

const navigateToCart = () => {
    emit("navigate-to-cart");
};
</script>

<style scoped>
.sidepanel {
    /* Content is centered vertically, each element per row -  Width is fixed to 52rem */
    @apply bg-gray-100 text-black w-full h-full min-w-52;
}

.sidepanel-layout {
    @apply flex flex-col items-center p-2 w-full h-full justify-between;
}

.sidepanel-container {
    @apply flex flex-col items-center p-2 w-full;
}

.sidepanel-title-area {
    @apply flex items-center w-full justify-items-start gap-2;
}

.order-info-area {
    @apply grid grid-cols-2 grid-rows-2 gap-2 w-full p-1;
}
</style>
