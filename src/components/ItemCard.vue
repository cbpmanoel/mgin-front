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
                <span v-if="quantity > 0">
                    <span>{{ quantity }} on cart</span>
                </span>
                <span v-else>
                    <span>&nbsp;</span>
                </span>
            </p>

            <!-- Add to cart button opens the product quantity selector -->
            <div class="card-footer">
                <CustomButton
                    :color="'green'"
                    :class="`w-full p-2 font-semibold `"
                    :content-align="`evenly`"
                    @click="onAddToCart"
                >
                    <object v-html="addToCartIco" v-once />
                    {{ quantity > 0 ? "Update cart" : "Add to cart" }}
                </CustomButton>

                <!-- Remove from cart button appears only if the quantity is greater than 0 -->
                <CustomButton
                    v-if="quantity > 0"
                    :color="'red'"
                    :class="`w-10 p-2 font-semibold `"
                    :content-align="`evenly`"
                    @click="onRemoveFromCart"
                >
                    <object v-html="trashIco" v-once />
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from "vue";
import addToCartIco from "@/assets/addToCart.svg?raw";
import trashIco from "@/assets/trash.svg?raw";
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

const emit = defineEmits(["add-to-cart", "remove-from-cart"]);

const onAddToCart = () => {
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

const onRemoveFromCart = () => {
    // Emit the remove-from-cart event with the item details
    emit("remove-from-cart", {
        id: props.id,
        categoryId: props.categoryId,
        name: props.description,
        price: props.price,
        imageSrc: props.imageSrc,
        quantity: 0,
    });
};
</script>

<style scoped>
/* Card background, shadow, and border radius */
.item-card {
    @apply bg-white shadow-md overflow-hidden min-w-[18rem] max-w-[18rem] rounded-lg;
    @apply sm:min-w-[20rem] sm:max-w-[20rem];
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

.card-footer {
    @apply flex gap-1 pt-2;
}
</style>
