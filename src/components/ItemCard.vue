<template>
    <Card class="card" unstyled>
        <template #header>
            <div class="card-header">
                <img :src="imageSrc" alt="Product image" class="w-full" />
            </div>
        </template>

        <template #title>
            <div class="card-title">
                {{ description }}
            </div>
        </template>
        <template #subtitle>
            <div class="card-body">
                <span v-if="quantity > 0">
                    <span>{{ quantity }} on cart</span>
                </span>
                <span v-else>
                    <span>&nbsp;</span>
                </span>
            </div>
        </template>
        <template #content>
            <div class="card-body">
                <p>${{ price.toFixed(2) }}</p>
            </div>
        </template>
        <template #footer>
            <div class="card-footer">
                <Button
                    @click="addToCart"
                    label="Add to cart"
                    icon="pi pi-shopping-cart"
                    severity="info"
                />
            </div>
        </template>
    </Card>
</template>

<script setup>
import { toRefs } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";

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
.card {
    @apply shadow-lg;
}
.card-header {
    @apply p-0;
}
.card-title {
    @apply p-2 text-xl font-semibold;
}
.card-body {
    @apply ml-2 mr-2 text-gray-500;
}
.card-footer {
    @apply p-2 flex flex-col;
}
</style>
