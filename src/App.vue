<template>
    <div class="single-col-layout">
        <router-view />
    </div>
</template>

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
