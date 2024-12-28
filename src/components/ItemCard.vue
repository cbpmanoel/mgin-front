<template>
    <article class="item-card">
        <img :src="props.imageSrc" alt="Product image" class="image" />
        <div class="p-2">
            <h2 class="description">{{ props.description }}</h2>
            <p class="price">{{ currencyAcr }}{{ props.price.toFixed(2) }}</p>
            <div class="quantity-container">
                <button
                    :disabled="disableDecrease"
                    @click="decreaseQuantity"
                    class="button quantity-button"
                >
                    <object v-html="minusIco" />
                </button>
                <span class="quantityText">{{ quantity }}</span>
                <button
                    :disabled="disableIncrease"
                    @click="increaseQuantity"
                    class="button quantity-button"
                >
                    <object v-html="plusIco" />
                </button>
            </div>
            <div class="mt-2">
                <button
                    :disabled="disableAddToCart"
                    @click="addToCart"
                    class="button cart-button"
                >
                    <object v-html="addToCartIco" />
                    Add to cart
                </button>
            </div>
        </div>
    </article>
</template>

<script setup>
import { ref, computed } from "vue";
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";
import addToCartIco from "@/assets/addToCart.svg?raw";

const quantity = ref(0);
const minQuantity = 0;
const maxQuantity = 10;
const currencyAcr = "$";

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
});

const disableDecrease = computed(() => quantity.value === minQuantity);
const disableIncrease = computed(() => quantity.value === maxQuantity);
const disableAddToCart = computed(() => quantity.value === minQuantity);

const increaseQuantity = () => {
    if (quantity.value < maxQuantity) {
        quantity.value += 1;
    }
};

const decreaseQuantity = () => {
    if (quantity.value > minQuantity) {
        quantity.value -= 1;
    }
};

const addToCart = () => {
    // Add item to cart
    console.log("Item added to cart");
    quantity.value = 0;
};
</script>

<style scoped>
/* Card bacground, shadow, and border radius */
.item-card {
    @apply bg-white shadow-md rounded-lg overflow-hidden;
    max-width: 200px;
}

/* Image styling - Covers the whole card width */
.image {
    @apply object-cover w-full;
}

/* Text styling */
.description {
    @apply text-lg font-semibold;
}

.price {
    @apply text-gray-500;
}

/* Flex container for quantity and buttons */
.quantity-container {
    @apply flex items-center justify-between mt-4;
}

/* Quantity text styling */
.quantity-text {
    @apply text-gray-800 font-semibold;
}

.quantity-button {
    @apply flex items-center justify-center w-8 h-8;
}

.cart-button {
    @apply flex items-center justify-around bg-blue-500 text-white p-2 w-full;
}

.cart-button:active {
    @apply bg-blue-600;
}

.cart-button:disabled {
    @apply bg-gray-300 text-gray-500;
}
</style>
