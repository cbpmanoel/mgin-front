<template>
    <div class="headerbar">
        <div class="headerbar-content">
            <button
                v-if="showLeftButton"
                class="headerbar-btn-left"
                @click="navigateToProducts"
            >
                <object v-html="categoryIcon" v-once />
                <div class="headerbar-text">
                    {{ isSmallScreen ? "<" : "Products" }}
                </div>
            </button>
            <div class="headerbar-center">
                <div class="headerbar-title">
                    {{ currentRoute }}
                </div>
            </div>
            <button class="headerbar-btn-right" @click="navigateToCart">
                <div class="headerbar-text">
                    {{ isSmallScreen ? ">" : "Cart" }}
                </div>
                <object v-html="cartIcon" v-once />
            </button>
        </div>
    </div>
</template>

<script setup>
import cartIcon from "@/assets/cart.svg?raw";
import categoryIcon from "@/assets/category.svg?raw";
import { computed } from "vue";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useBreakpoints } from "@vueuse/core";

// Router navigation
const { navigateToCart, navigateToProducts, router } = useRouterNavigation();

// Get the current route name to title
const currentRoute = computed(() => {
    console.log(router.currentRoute.value.name);
    return router.currentRoute.value.name;
});

// Breakpoints
const breakpoints = useBreakpoints({
    sm: 640, // Tailwind's sm breakpoint
});

// Check if the screen size is sm or smaller
const isSmallScreen = breakpoints.smaller("sm");

// Define whether the left button should be shown
const showLeftButton = computed(() => {
    return currentRoute.value !== "products" && !isSmallScreen.value;
});
</script>

<style scoped>
.headerbar {
    @apply text-white w-full h-full p-2;
}

.headerbar-content {
    @apply w-full h-full flex justify-end items-center p-4 gap-8;
    @apply sm:justify-between;
}

.headerbar-btn-left,
.headerbar-btn-right {
    @apply flex items-center justify-around gap-2 p-1 shadow-gray-900 rounded-md shadow-lg;
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
