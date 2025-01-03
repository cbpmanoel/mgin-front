<template>
    <Dialog
        v-model:visible="showModal"
        :modal="true"
        :closable="true"
        :draggable="false"
    >
        <template #container>
            <!-- Modal content -->
            <div class="component-container">
                <!-- Product Image -->
                <img
                    :src="image"
                    alt="Product Image"
                    class="max-h-[512px] max-w-[512px]"
                />

                <!-- Product Details -->
                <div class="flex flex-col w-full gap-2 mt-4">
                    <div class="text-xl font-semibold cell-center">
                        <span>
                            Select
                            <span style="font-style: italic">{{ name }}</span
                            >'s quantity:
                        </span>
                    </div>

                    <!-- Quantity control -->
                    <div class="w-full cell-center">
                        <QuantitySelector
                            :quantity="mutableQuantity"
                            :iconWidth="'w-10'"
                            :iconHeight="'h-10'"
                            @quantity-changed="onQuantityChanged"
                        />
                    </div>

                    <!-- Cancel and Confirm buttons -->
                    <div
                        class="flex items-center w-full gap-1 justify-evenly h-[45px] mt-4"
                    >
                        <Button
                            @click="onCancel"
                            label="Cancel"
                            severity="secondary"
                        />

                        <Button
                            @click="onConfirm"
                            :label="confirmationButtonText"
                            icon="pi pi-cart-plus"
                            iconPos="left"
                            severity="success"
                        />
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, toRefs, computed } from "vue";
import QuantitySelector from "./QuantitySelector.vue";

import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: "",
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    minQuantity: {
        type: Number,
        required: false,
        default: 0,
    },
    maxQuantity: {
        type: Number,
        required: false,
        default: 10,
    },
    showModal: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// Initialize the item references
const quantityOnOpen = ref(props.quantity); // Quantity when the modal was opened
const mutableQuantity = ref(props.quantity); // Mutable quantity
const { name, image, showModal } = toRefs(props);

console.log("ProductQuantitySelect props");
console.log(props);

// Compute the confirm's button text the explicitly show
// that the quantity will be changed if the item is already
// on the cart.
const confirmationButtonText = computed(() => {
    if (quantityOnOpen.value === 0) {
        return "Add to cart";
    }
    return "Update your cart";
});

const emit = defineEmits(["confirm", "cancel"]);

// Callbacks

// Return the selected quantity
const onConfirm = () => {
    console.log("Modal asked for update");
    emit("confirm", { quantity: mutableQuantity.value });
};

const onCancel = () => {
    console.log("Modal canceled");
    emit("cancel");
};

// Handler to the quantity change event
const onQuantityChanged = ({ quantity, action }) => {
    console.log("Quantity changed", quantity);

    switch (action) {
        case "increase":
            mutableQuantity.value++;
            console.log("increased");
            break;
        case "decrease":
            mutableQuantity.value--;
            console.log("decrease");
            break;
    }

    console.log("New  qty: ", mutableQuantity.value);
};
</script>

<style scoped>
.component-container {
    @apply flex flex-col justify-evenly items-center p-2;
}
</style>
