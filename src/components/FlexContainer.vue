<template>
    <div class="title">
        <slot name="header" />
    </div>
    <section class="grid-container">
        <slot name="body" />
    </section>
</template>

<style scoped>
.grid-container {
    @apply flex gap-4 flex-wrap justify-center sm:justify-start;
}

.title {
    @apply text-2xl font-bold mb-2;
}
</style>
