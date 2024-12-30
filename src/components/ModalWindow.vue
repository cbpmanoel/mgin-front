<template>
    <!-- Page overlay to highlight modal, emits clicked-outside event -->
    <div
        @click="onClickedOutside"
        class="z-40 modal-overlay"
        :class="overlayClass"
    />
    <!-- Modal container -->
    <div
        class="z-50 modal-window"
        :class="bgClass"
        :style="[{ width: modalStyle.width, height: modalStyle.height }]"
    >
        <!-- Modal content -->
        <div class="modal-content">
            <!-- Content-->
            <slot />
        </div>
    </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const emit = defineEmits(["clicked-outside"]);

// Style props
const props = defineProps({
    width: {
        type: String,
        default: "fit-content",
    },
    height: {
        type: String,
        default: "fit-content",
    },
    bgColor: {
        type: String,
        default: "bg-gray-100",
    },
    overlayColor: {
        type: String,
        default: "bg-black opacity-70",
    },
});

// Styles
const modalStyle = ref({
    width: props.width,
    height: props.height,
});

const bgClass = ref(props.bgColor);
const overlayClass = ref(props.overlayColor);

// Callbacks
const onClickedOutside = () => {
    emit("clicked-outside");
};
</script>

<style scoped>
.modal-overlay {
    @apply fixed inset-0;
}

.modal-window {
    @apply fixed inset-0  shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-4;
}

.modal-content {
    @apply flex flex-col justify-center items-center;
}
</style>
