<template>
    <div v-if="props.title" class="title">
        {{ props.title }}
    </div>
    <section class="base-container">
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
.base-container {
    @apply grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container;
}

.title {
    @apply text-2xl font-bold mb-2;
}
</style>
