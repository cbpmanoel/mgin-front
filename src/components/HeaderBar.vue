<template>
    <div class="headerbar">
        <div
            class="headerbar-content"
            :class="[showLeftButton ? 'justify-between' : 'justify-end']"
        >
            <CustomButton
                v-if="showLeftButton"
                :color="'gray'"
                :class="'headerbar-btn'"
                @click="goToProducts"
            >
                <object v-html="categoryIcon" v-once />
                <div v-if="!isSmallScreen" class="headerbar-text">
                    {{ "Products" }}
                </div>
            </CustomButton>
            <div class="headerbar-center">
                <div :class="['headerbar-title']">
                    {{ currentRouteTitle }}
                </div>
            </div>
            <CustomButton
                :color="'gray'"
                :class="'headerbar-btn'"
                @click="goToCart"
            >
                <div v-if="!isSmallScreen" class="headerbar-text">
                    {{ "Cart" }}
                </div>
                <object v-html="cartIcon" v-once />
            </CustomButton>
        </div>
    </div>
</template>

<script setup>
import cartIcon from "@/assets/cart.svg?raw";
import categoryIcon from "@/assets/category.svg?raw";
import { computed } from "vue";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useBreakpoints } from "@vueuse/core";
import CustomButton from "./CustomButton.vue";

// Router navigation
const { navigateToCart, navigateToProducts, router } = useRouterNavigation();

// Get the current route name to title
const currentRouteTitle = computed(() => {
    return router.currentRoute.value.meta.title;
});

const goToProducts = async () => {
    await navigateToProducts();
};

const goToCart = async () => {
    await navigateToCart();
};

// Breakpoints
const breakpoints = useBreakpoints({
    sm: 640, // Small screens
    md: 768, // Medium screens
    lg: 1024, // Large screens
    xl: 1280, // Extra large screens
    "2xl": 1536, // 2x extra large screens
});

// Check if the screen size is sm or smaller
const isSmallScreen = breakpoints.smaller("sm");

// Define whether the left button should be shown
const showLeftButton = computed(() => {
    if (isSmallScreen.value) {
        return currentRouteTitle.value !== "Products";
    }

    return true;
});
</script>

<style scoped>
.headerbar {
    @apply text-white w-full h-full p-2 border-collapse border-b-2 border-gray-500;
}

.headerbar-content {
    @apply h-full flex items-center p-4 gap-8;
}

.headerbar-btn {
    @apply flex items-center justify-center gap-2 p-1 shadow-gray-900 rounded-lg shadow-md h-12 min-w-12;
}

.headerbar-center {
    @apply flex items-center;
}

.headerbar-text {
    @apply text-lg;
}

.headerbar-title {
    @apply text-3xl font-semibold;
}
</style>
