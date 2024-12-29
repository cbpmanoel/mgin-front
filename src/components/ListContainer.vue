<template>
    <div v-if="props.title" class="title">
        {{ props.title }}
    </div>
    <section :class="listContainerClass">
        <slot />
    </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    divideItems: {
        type: Boolean,
        default: true,
    },
});

const listContainerClass = computed(() => {
    return {
        "list-container": true,
        "divide-y divide-gray-200": props.divideItems,
    };
});
</script>

<style scoped>
.list-container {
    @apply grid grid-cols-1 container;
}

.title {
    @apply text-2xl font-bold mb-2;
}
</style>
