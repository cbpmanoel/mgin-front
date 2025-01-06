<template>
    <!-- Modal content -->
    <div class="component-container">
        <!-- Product Image -->
        <img
            :src="image"
            alt="Product Image"
            :class="['max-w-[20rem] max-h-[30rem]', 'sm:max-w-[30rem]']"
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
                    :minusIco="minusIco"
                    :plusIco="plusIco"
                    :iconWidth="'w-10'"
                    :iconHeight="'h-10'"
                    @quantity-changed="onQuantityChanged"
                />
            </div>

            <!-- Cancel and Confirm buttons -->
            <div class="flex items-center w-full gap-1 justify-evenly h-[45px]">
                <CustomButton
                    :color="'gray'"
                    class="min-w-[25%] p-2"
                    @click="onCancel"
                >
                    Cancel
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
import { ref, toRefs, computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";
import addToCartIco from "@/assets/addToCart.svg?raw";
import QuantitySelector from "./QuantitySelector.vue";

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
});

// Initialize the item references
const quantityOnOpen = ref(props.quantity); // Quantity when the modal was opened
const mutableQuantity = ref(props.quantity); // Mutable quantity
const { name, image } = toRefs(props);

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
    @apply flex flex-col justify-center items-center min-w-[360px];
}
</style>
