<template>
    <div class="headerbar">
        <div class="headerbar-content">
            <button class="headerbar-left" @click="navigateToProducts">
                <object v-html="categoryIcon" v-once />
                <div class="headerbar-text">Go To Products</div>
            </button>
            <div class="headerbar-center">
                <div class="headerbar-title">
                    {{ currentRoute }}
                </div>
            </div>
            <button class="headerbar-right" @click="navigateToCart">
                <div class="headerbar-text">Go To Cart</div>
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

// Router navigation
const { navigateToCart, navigateToProducts, router } = useRouterNavigation();

// Get the current route name to title
const currentRoute = computed(() => {
    console.log(router.currentRoute.value.name);
    return router.currentRoute.value.name;
});
</script>

<style scoped>
.headerbar {
    @apply text-white w-full h-full p-2 border-b-2 border-gray-700;
}

.headerbar-content {
    @apply w-full h-full flex justify-between items-center p-4;
}

.headerbar-left,
.headerbar-right {
    @apply flex items-center justify-around gap-2;
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
