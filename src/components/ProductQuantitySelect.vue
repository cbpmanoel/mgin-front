<template>
    <!-- Modal content -->
    <div class="component-container">
        <!-- Product Image -->
        <img
            :src="item.image"
            alt="Product Image"
            class="max-h-[512px] max-w-[512px]"
        />

        <!-- Product Details -->
        <div class="flex flex-col w-full gap-2 mt-4">
            <div class="text-xl font-semibold cell-center">
                <span>
                    Select
                    <span style="font-style: italic">{{ item.name }}</span
                    >'s quantity:
                </span>
            </div>

            <!-- Quantity control -->
            <div class="w-full cell-center">
                <QuantitySelector
                    :quantity="item.quantity"
                    :minusIco="minusIco"
                    :plusIco="plusIco"
                    :iconWidth="'w-10'"
                    :iconHeight="'h-10'"
                    @quantity-changed="onQuantityChanged"
                />
            </div>

            <!-- Cancel, Remove and Confirm buttons -->
            <div class="flex items-center w-full gap-1 justify-evenly h-[45px]">
                <CustomButton
                    :color="'gray'"
                    class="min-w-[25%] p-2"
                    @click="onCancel"
                >
                    Cancel
                </CustomButton>
                <!-- Remove button only appears when the item already is on the cart -->
                <CustomButton
                    v-if="quantityOnOpen > 0"
                    class="min-w-[25%] p-2"
                    :color="'red'"
                    @click="onRemove"
                >
                    Remove
                </CustomButton>

                <CustomButton
                    :color="'blue'"
                    class="w-full p-2 font-semibold"
                    :contentAlign="'evenly'"
                    @click="onConfirm"
                >
                    <object v-html="addToCartIco" v-once />
                    {{ confirmationButtonText }}
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";
import addToCartIco from "@/assets/addToCart.svg?raw";
import QuantitySelector from "./QuantitySelector.vue";

const props = defineProps({
    itemName: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        required: false,
        default: "",
    },
    itemQuantity: {
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
});

const quantityOnOpen = ref(props.itemQuantity);

// Initialize the item references
const item = ref({
    name: props.itemName,
    quantity: props.itemQuantity,
    image: props.itemImage,
    minQuantity: props.minQuantity,
    maxQuantity: props.maxQuantity,
});

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
// Pass quantity as 0 to remove the item
const onRemove = () => {
    console.log("Modal asked for remove");
    emit("confirm", { quantity: 0 });
};

// Return the selected quantity
const onConfirm = () => {
    console.log("Modal asked for update");
    emit("confirm", { quantity: item.value.quantity });
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
            item.value.quantity++;
            console.log("increased");
            break;
        case "decrease":
            item.value.quantity--;
            console.log("decrease");
            break;
    }

    console.log("New  qty: ", item.value.quantity);
};
</script>

<style scoped>
.component-container {
    @apply flex flex-col justify-center items-center;
}
</style>
