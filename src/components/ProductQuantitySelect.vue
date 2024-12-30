<template>
    <!-- Modal content -->
    <div class="component-container">
        <img :src="item.image" alt="Product Image" />
        <h2 class="text-lg font-semibold">
            <p>
                Select
                <span style="font-style: italic">{{ item.name }}</span>
                's quantity
            </p>
        </h2>

        <!-- Quantity control area -->
        <div class="cell-center">
            <CustomButton
                :color="'blue'"
                :class="'w-8 h-8'"
                :disabled="item.quantity <= item.minQuantity"
                @click="onDecreaseQuantity"
            >
                <object v-html="minusIco" v-once />
            </CustomButton>
            <span class="w-8 h-8 cell-center">{{ item.quantity }}</span>
            <CustomButton
                :color="'blue'"
                :class="'w-8 h-8'"
                :disabled="item.quantity >= item.maxQuantity"
                @click="onIncreaseQuantity"
            >
                <object v-html="plusIco" v-once />
            </CustomButton>
        </div>
        <!-- Cancel, Remove and Confirm buttons -->
        <div class="flex justify-between w-full">
            <CustomButton :color="'gray'" @click="onCancel">
                Cancel
            </CustomButton>
            <!-- Remove button only appears when the item already is on the cart -->
            <CustomButton
                v-if="quantityOnOpen > 0"
                :color="'red'"
                @click="onRemove"
            >
                Remove
            </CustomButton>

            <CustomButton :color="'blue'" @click="onConfirm">
                {{ confirmationButtonText }}
            </CustomButton>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";

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
    return "Update quantity";
});

const emit = defineEmits(["confirm", "cancel"]);

// Callbacks
// Pass quantity as 0 to remove the item
const onRemove = () => {
    console.log("Remove item");
    emit("confirm", { quantity: 0 });
};

// Return the selected quantity
const onConfirm = () => {
    console.log("Modal confirmed");
    emit("confirm", { quantity: item.value.quantity });
};

// Quantity area manipulators
const onIncreaseQuantity = () => {
    if (item.value.quantity < props.maxQuantity) {
        item.value.quantity++;
    }
    console.log("onIncreaseQuantity:", item.value.quantity);
};

const onDecreaseQuantity = () => {
    if (item.value.quantity > props.minQuantity) {
        item.value.quantity--;
    }
    console.log("onDecreaseQuantity:", item.value.quantity);
};
</script>

<style scoped>
.component-container {
    @apply flex flex-col justify-center items-center;
}
</style>
