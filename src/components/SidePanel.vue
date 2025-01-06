<template>
    <div class="sidepanel">
        <div class="sidepanel-layout">
            <!-- Category section -->
            <div class="sidepanel-container">
                <div class="mb-4 sidepanel-title-area">
                    <object v-html="categoryIco" v-once aria-hidden="true" />
                    <h2 class="text-2xl font-semibold">Categories</h2>
                </div>

                <!-- Category buttons -->
                <CustomButton
                    v-for="category in props.categories"
                    :key="category.id"
                    :color="'gray'"
                    :class="'w-full mb-2 p-2'"
                    @click="scrollTo(category.name)"
                >
                    {{ category.name }}
                </CustomButton>

                <!-- Fallback for empty categories -->
                <p v-if="!props.categories.length" class="text-gray-500">
                    No categories available.
                </p>
            </div>

            <!-- Order total section -->
            <div class="sidepanel-container">
                <div class="sidepanel-title-area">
                    <object v-html="cartIco" v-once aria-hidden="true" />
                    <h2 class="text-2xl font-semibold">Order total</h2>
                </div>

                <div class="order-info-area">
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
        validator: (value) => {
            return value.every((category) => category.id && category.name);
        },
    },
    totalItems: {
        type: Number,
        required: true,
        validator: (value) => value >= 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        validator: (value) => value >= 0,
    },
});

const emit = defineEmits(["scroll-to-category", "navigate-to-cart"]);

const scrollTo = (category) => {
    emit("scroll-to-category", category);
};

const navigateToCart = () => {
    emit("navigate-to-cart");
};
</script>

<style scoped>
.sidepanel {
    @apply bg-gray-100 text-black w-full h-full min-w-52 shadow-xl sm:shadow-none;
}

.sidepanel-layout {
    @apply flex flex-col items-center p-1 w-full h-full justify-between;
}

.sidepanel-container {
    @apply flex flex-col items-center p-2 w-full;
}

.sidepanel-title-area {
    @apply flex items-center w-full gap-2;
}

.order-info-area {
    @apply grid grid-cols-2 grid-rows-2 gap-2 w-full p-1;
}
</style>
