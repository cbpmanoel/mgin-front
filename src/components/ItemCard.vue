<template>
    <article class="item-card">
        <!-- Product image: Occupies the whole width of the card and the upper part -->
        <img :src="props.imageSrc" alt="Product image" class="image" />
        <div class="p-2">
            <!-- Product description and price -->
            <h2 class="description">{{ props.description }}</h2>
            <p class="price">{{ currencyAcr }}{{ props.price.toFixed(2) }}</p>

            <!-- Quantity and quantity management buttons -->
            <div class="quantity-container">
                <button
                    :disabled="disableDecrease"
                    @click="decreaseQuantity"
                    class="button quantity-button"
                >
                    <object v-html="minusIco" />
                </button>
                <span class="quantity-text">{{ quantity }}</span>
                <button
                    :disabled="disableIncrease"
                    @click="increaseQuantity"
                    class="button quantity-button"
                >
                    <object v-html="plusIco" />
                </button>
            </div>

            <!-- Add to cart button: Disabled if quantity is 0 -->
            <div class="mt-2">
                <button
                    :disabled="disableAddToCart"
                    @click="addToCart"
                    class="button add-to-cart-button"
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
    minQuantity: {
        type: Number,
        default: 0,
    },
    maxQuantity: {
        type: Number,
        default: 10,
    },
    currencyAcr: {
        type: String,
        default: "$",
    },
});

const disableDecrease = computed(() => quantity.value === props.minQuantity);
const disableIncrease = computed(() => quantity.value === props.maxQuantity);
const disableAddToCart = computed(() => quantity.value === props.minQuantity);

const increaseQuantity = () => {
    if (quantity.value < props.maxQuantity) {
        quantity.value += 1;
    }
};

const decreaseQuantity = () => {
    if (quantity.value > props.minQuantity) {
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

/* Quantity text */
.quantity-text {
    @apply text-gray-800 font-semibold;
}

/* Flex container for quantity and buttons */
.quantity-container {
    @apply flex items-center justify-between mt-4;
}
</style>
