<template>
    <div class="flex flex-col flex-1 min-h-screen">
        <!-- Header bar -->
        <div class="bg-gray-800 text-white sticky-nav-top h-16">
            <HeaderBar :title="title" />
        </div>
        <!-- View content -->
        <div class="bg-gray-800">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderBar from "./components/HeaderBar.vue";

const title = ref("Shop");
</script>

<style scoped>
.svg-white {
    @apply text-white fill-current;
}

.sticky-nav-top {
    @apply sticky top-0 z-10;
}

.sticky-nav-bottom {
    @apply sticky bottom-0 z-10;
}
</style>
