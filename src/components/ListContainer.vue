<template>
    <div v-if="props.title" class="title">
        {{ props.title }}
    </div>
    <section class="grid-container">
        <slot />
    </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    title: {
        type: String,
        default: "",
    },
});
</script>

<style scoped>
.grid-container {
    @apply grid gap-4 grid-cols-1 container;
}

.title {
    @apply text-2xl font-bold mb-2;
}
</style>
