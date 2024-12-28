<template>
    <button :class="computedClass" :disabled="props.disabled" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup>
import { computed } from "vue";
import { button } from "@/utils/buttonVariants";

const props = defineProps({
    color: {
        type: String,
        default: "blue",
    },
    class: {
        type: String,
        default: "",
    },
    contentAlign: {
        type: String,
        default: "center",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const computedClass = computed(() => {
    // Get the button variant based on the props, then return the class with the extra class prop
    const variant = button({
        color: props.color,
        disabled: props.disabled,
        contentAlign: props.contentAlign,
    });
    return `${variant} ${props.class}`;
});
</script>
