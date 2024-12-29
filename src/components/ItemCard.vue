<template>
    <article class="item-card">
        <!-- Product image: Occupies the whole width of the card and the upper part -->
        <img :src="props.imageSrc" alt="Product image" class="image" />
        <div class="p-2">
            <!-- Product description and price -->
            <h2 class="description">{{ props.description }}</h2>
            <p class="price">${{ props.price.toFixed(2) }}</p>

            <!-- Quantity and quantity management buttons -->
            <div class="quantity-container">
                <CustomButton
                    :color="'blue'"
                    :class="`h-8 w-8`"
                    :disabled="quantity === props.minQuantity"
                    @click="decreaseQuantity"
                >
                    <object v-html="minusIco" v-once />
                </CustomButton>

                <span class="quantity-text">{{ quantity }}</span>

                <CustomButton
                    :color="'blue'"
                    :class="`h-8 w-8`"
                    :disabled="quantity === props.maxQuantity"
                    @click="increaseQuantity"
                >
                    <object v-html="plusIco" v-once />
                </CustomButton>
            </div>

            <!-- Add to cart button: Disabled if quantity is 0 -->
            <div class="mt-2">
                <CustomButton
                    :color="'green'"
                    :class="`w-full p-2 font-semibold `"
                    :content-align="`evenly`"
                    @click="addToCart"
                >
                    <object v-html="addToCartIco" v-once />
                    Add to cart
                </CustomButton>
            </div>
        </div>
    </article>
</template>

<script setup>
import { ref } from "vue";
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";
import addToCartIco from "@/assets/addToCart.svg?raw";
import CustomButton from "@/components/CustomButton.vue";

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
});

const emit = defineEmits(["add-to-cart"]);

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
    // Emit contains only the item ids and quantity
    // The parent component will handle the rest
    emit("add-to-cart", {
        id: props.id,
        categoryId: props.categoryId,

        // Returning price just in case it changes in the future
        name: props.description,
        price: props.price,
        quantity: quantity.value,
    });

    // Reset the quantity to 0
    //quantity.value = 0;
};
</script>

<style scoped>
/* Card background, shadow, and border radius */
.item-card {
    @apply bg-white shadow-md overflow-hidden;
    max-width: 300px;
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
