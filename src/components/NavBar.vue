<template>
    <section :class="['navbar', bgColorClass]">
        <slot />
    </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    bgColor: {
        type: String,
        default: "bg-gray-800",
    },
});

// Dynamically apply the background color class
const bgColorClass = computed(() => props.bgColor);
</script>

<style scoped>
.navbar {
    @apply grid grid-rows-1 gap-4 text-white p-4 mx-auto grid-flow-col h-12 items-center;
}
</style>

<style>
.navbutton {
    @apply flex items-center space-x-2;
}
</style>
