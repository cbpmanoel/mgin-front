<template>
    <button :class="computedClass" :disabled="props.disabled" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup>
import { computed } from "vue";
import { tv } from "tailwind-variants";

// Define the button component
const button = tv({
    base: "rounded-md text-center text-lg transition-colors duration-150",
    variants: {
        color: {
            green: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
            red: "bg-red-400 text-white hover:bg-red-500 active:bg-red-700",
            blue: "bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-700",
            gray: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
        },
        disabled: {
            true: "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none",
            false: "",
        },
        contentAlign: {
            center: "flex items-center justify-center",
            left: "flex items-center justify-start",
            right: "flex items-center justify-end",
            around: "flex items-center justify-around",
            between: "flex items-center justify-between",
            evenly: "flex items-center justify-evenly",
            stretch: "flex items-stretch justify-center",
        },
    },
    defaultVariants: {
        color: "blue",
        disabled: false,
        contentAlign: "center",
    },
});

// Component props
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
