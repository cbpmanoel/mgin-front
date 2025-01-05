<template>
    <div class="flex flex-col w-full p-4 screen-height sm:flex-row">
        <!-- Items List -->
        <div
            ref="items-list"
            class="w-full p-2 overflow-y-auto bg-gray-100 shadow-xl sm:w-[calc(100%-20rem)]"
        >
            <ListContainer>
                <!-- Table Header -->
                <div class="custom-list-item">
                    <div class="p-4 custom-list-item-content">
                        <div class="font-bold cell-center-left">Item</div>
                        <div
                            v-if="!isSmallScreen"
                            class="font-bold cell-center"
                        >
                            Price
                        </div>
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
                        <div v-if="!isSmallScreen" class="cell-center">
                            ${{ item.price.toFixed(2) }}
                        </div>
                        <!-- Column 3: Quantity -->
                        <div class="cell-center">
                            <QuantitySelector
                                :quantity="item.quantity"
                                :minQuantity="1"
                                :maxQuantity="10"
                                @quantity-changed="
                                    onQuantityChanged(item, $event)
                                "
                            />
                            <CustomButton
                                :color="'red'"
                                :class="'w-8 h-8 ml-2'"
                                @click="onRemoveFromCart(item)"
                            >
                                <object v-html="trashIco" v-once />
                            </CustomButton>
                        </div>
                        <!-- Column 4: Total price -->
                        <div class="cell-center-right">
                            ${{ (item.price * item.quantity).toFixed(2) }}
                        </div>
                    </div>
                </div>
            </ListContainer>
        </div>

        <!-- Payment Overview -->
        <div
            ref="payment-overview"
            class="w-full p-2 mt-4 bg-gray-100 shadow-xl sm:w-80 sm:ml-4 sm:mt-0"
        >
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
                <CustomButton
                    :color="'green'"
                    :class="'w-full p-2 font-semibold'"
                    :contentAlign="'evenly'"
                    :disabled="totalItems === 0"
                    @click="onNavigateToCheckout"
                >
                    <object v-html="LockIco" v-once />
                    Proceed to Checkout
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import ListContainer from "@/components/ListContainer.vue";
import QuantitySelector from "@/components/QuantitySelector.vue";
import trashIco from "@/assets/trash.svg?raw";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import LockIco from "@/assets/lock.svg?raw";
import { useCart } from "@/composables/useCart";
import { useBreakpoints } from "@vueuse/core";

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

// Breakpoints
const breakpoints = useBreakpoints({
    sm: 640, // Tailwind's sm breakpoint
});

// Check if the screen size is sm or smaller
const isSmallScreen = breakpoints.smaller("sm");
</script>

<style scoped>
.custom-list-item {
    @apply bg-white w-full;
}

.custom-list-item-content {
    @apply grid grid-flow-col auto-cols-fr;
}
</style>
