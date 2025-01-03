<template>
    <div class="item-card">
        <!-- Product image: Occupies the whole width of the card and the upper part -->
        <img :src="imageSrc" alt="Product image" class="image" />
        <div class="p-2">
            <!-- Product description and price -->
            <h2 class="description">{{ description }}</h2>
            <p class="price">${{ price.toFixed(2) }}</p>

            <!-- Quantity text -->
            <p class="quantity-text">
                <span v-show="quantity > 0">{{ quantity }} on cart</span>
                <span v-show="quantity === 0">&nbsp;</span>
            </p>

            <!-- Add to cart button -->
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
    </div>
</template>

<script setup>
import { toRefs } from "vue";
import addToCartIco from "@/assets/addToCart.svg?raw";
import CustomButton from "@/components/CustomButton.vue";

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
    quantity: {
        type: Number,
        required: true,
    },
});

// Reactive variables from props
const { description, price, imageSrc, quantity } = toRefs(props);

const emit = defineEmits(["add-to-cart"]);

const addToCart = () => {
    // Emit the add-to-cart event with the item details
    emit("add-to-cart", {
        id: props.id,
        categoryId: props.categoryId,
        name: props.description,
        price: props.price,
        imageSrc: props.imageSrc,
        quantity: props.quantity,
    });
};
</script>

<style scoped>
/* Card background, shadow, and border radius */
.item-card {
    @apply bg-white shadow-md overflow-hidden min-w-[200px] max-w-[300px];
}

/* Image styling - Covers the whole card width */
.image {
    @apply object-cover w-full;
}

/* Text styling */
.description {
    @apply text-lg font-semibold;
}

.quantity-text,
.price {
    @apply text-gray-500;
}
</style>
