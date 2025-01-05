<template>
    <div class="category-item">
        <div class="image-container">
            <img :src="imageSrc" alt="Category Image" class="category-image" />
        </div>
        <div class="category-name">
            {{ name }}
        </div>
    </div>
</template>

<script setup>
import { toRefs } from "vue";

// Define props
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
});

// Refs to props
const { name, imageSrc } = toRefs(props);
</script>

<style scoped>
.category-item {
    @apply w-full flex flex-row items-center rounded-lg h-10 sm:h-20 gap-4;
}

.image-container {
    @apply overflow-hidden w-10 h-10 sm:w-20 sm:h-20 rounded-l-lg;
}

.category-image {
    @apply w-full h-full object-cover object-center;
    /*transform: scale(1.25);*/
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
}

.category-name {
    @apply text-xl font-semibold;
    @apply sm:text-2xl;
}
</style>
