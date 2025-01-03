<template>
    <div class="flex w-full p-4 screen-height">
        <div class="w-3/4 p-2 overflow-y-auto bg-gray-100 shadow-xl">
            <ListContainer>
                <!-- Table Header -->
                <div class="custom-list-item">
                    <div class="p-4 custom-list-item-content">
                        <div class="font-bold cell-center-left">Item</div>
                        <div class="font-bold cell-center">Price</div>
                        <div class="font-bold cell-center">Quantity</div>
                        <div class="font-bold cell-center-right">Total</div>
                    </div>
                </div>

                <!-- Cart items -->
                <div
                    v-for="[itemKey, item] in cart"
                    :key="itemKey"
                    class="custom-list-item"
                >
                    <!-- Item details -->
                    <div class="p-4 custom-list-item-content">
                        <!-- Column 1: Item name -->
                        <div class="text-xl font-semibold cell-center-left">
                            {{ item.name }}
                        </div>
                        <!-- Column 2: Price -->
                        <div class="cell-center">
                            ${{ item.price.toFixed(2) }}
                        </div>
                        <!-- Column 3: Quantity -->
                        <div class="gap-1 cell-center">
                            <QuantitySelector
                                :quantity="item.quantity"
                                :minQuantity="1"
                                :maxQuantity="10"
                                @quantity-changed="
                                    onQuantityChanged(item, $event)
                                "
                            />
                            <Button
                                @click="onRemoveFromCart(item)"
                                icon="pi pi-trash"
                                icon-pos="center"
                                severity="danger"
                                class="w-8 h-8 min-w-8 max-w-8"
                            />
                        </div>
                        <!-- Column 4: Total price -->
                        <div class="cell-center-right">
                            ${{ (item.price * item.quantity).toFixed(2) }}
                        </div>
                    </div>
                </div>
            </ListContainer>
        </div>
        <div class="w-1/4 p-2 ml-4 bg-gray-100 shadow-xl">
            <div title="Order Summary">
                <h2 class="p-1 mb-4 text-lg font-bold">Order Summary</h2>
                <div class="grid w-full grid-cols-2 grid-rows-2 gap-2 p-1 mb-2">
                    <div class="font-semibold">Items:</div>
                    <div class="cell-center-right">
                        {{ totalItems }}
                    </div>
                    <div class="font-semibold">Total:</div>
                    <div class="cell-center-right">${{ total.toFixed(2) }}</div>
                </div>

                <!-- Proceed to checkout button -->
                <Button
                    :class="'w-full p-2 mb-2'"
                    :disabled="totalItems === 0"
                    @click="onNavigateToCheckout"
                    label="Proceed to Checkout"
                    icon="pi pi-lock"
                    severity="success"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import ListContainer from "@/components/ListContainer.vue";
import QuantitySelector from "@/components/QuantitySelector.vue";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useCart } from "@/composables/useCart";
import Button from "primevue/button";

// Router navigation composable
const { navigateToCheckout } = useRouterNavigation();

// Cart composable
const {
    cart,
    totalCartValue,
    totalItemsInCart,
    removeFromCart,
    increaseProductQty,
    decreaseProductQty,
} = useCart();

// Watch the total cost and total items on cart
const total = computed(() => totalCartValue.value);
const totalItems = computed(() => totalItemsInCart.value);
console.log("Cart items", cart.value);

const onQuantityChanged = (item, { quantity, action }) => {
    console.log("Quantity changed", quantity);

    switch (action) {
        case "increase":
            console.log("Increase quantity of item", item);
            increaseProductQty(item);
            break;
        case "decrease":
            console.log("Decrease quantity of item", item);
            decreaseProductQty(item);
            break;
    }
};

// Remove an item from the cart
function onRemoveFromCart(item) {
    console.log("Remove item from cart", item);
    removeFromCart(item);
}

// Proceed to checkout page
function onNavigateToCheckout() {
    navigateToCheckout();
}
</script>

<style scoped>
.custom-list-item {
    @apply bg-white w-full;
}

.custom-list-item-content {
    @apply grid grid-flow-col auto-cols-fr;
}
</style>
