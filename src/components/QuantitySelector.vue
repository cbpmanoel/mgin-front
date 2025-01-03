<template>
    <div class="cell-center">
        <Button
            @click="onDecreaseQuantity"
            icon="pi pi-minus"
            :class="iconClass"
            :disabled="quantity <= minQuantity"
            severity="info"
            size="small"
        />
        <div class="h-full font-semibold cell-center" :class="iconClass">
            {{ quantity }}
        </div>
        <Button
            @click="onIncreaseQuantity"
            icon="pi pi-plus"
            :class="iconClass"
            :disabled="quantity >= maxQuantity"
            severity="info"
        />
    </div>
</template>

<script setup>
import { computed, defineProps, ref } from "vue";
import Button from "primevue/button";

// Fake enum to actions
const actions = {
    decrease: "decrease",
    increase: "increase",
};

const props = defineProps({
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    minQuantity: {
        type: Number,
        default: 0,
    },
    maxQuantity: {
        type: Number,
        default: 10,
    },
    iconWidth: {
        type: String,
        default: "w-8",
    },
    iconHeight: {
        type: String,
        default: "h-8",
    },
});

const emit = defineEmits(["quantity-changed"]);

// Computed properties
const quantity = computed(() => props.quantity);
const minQuantity = ref(props.minQuantity);
const maxQuantity = ref(props.maxQuantity);

// Icon size classes
const iconClass = computed(() => `${props.iconWidth} ${props.iconHeight}`);

const onDecreaseQuantity = () => {
    if (quantity.value > minQuantity.value) {
        emit("quantity-changed", {
            quantity: quantity.value,
            action: actions.decrease,
        });
    }
};

const onIncreaseQuantity = () => {
    if (quantity.value < maxQuantity.value) {
        emit("quantity-changed", {
            quantity: quantity.value,
            action: actions.increase,
        });
    }
};
</script>
