<template>
    <div v-if="props.title" class="title">
        {{ props.title }}
    </div>
    <section class="grid-container">
        <slot />
    </section>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
});
</script>

<style scoped>
.grid-container {
    @apply grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container;
}

.title {
    @apply text-2xl font-bold mb-2;
}
</style>
