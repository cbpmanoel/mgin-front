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
                    @click="onAddToCart"
                    :label="quantity > 0 ? 'Update cart' : 'Add to cart'"
                    icon="pi pi-cart-plus"
                    severity="info"
                    class="w-full"
                />
                <!-- Remove button only appears when the item already is on the cart -->
                <Button
                    v-if="quantity > 0"
                    @click="onRemove"
                    icon="pi pi-trash"
                    severity="danger"
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

const onRemove = () => {
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
    @apply p-2 flex gap-1;
}
</style>
