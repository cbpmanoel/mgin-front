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
                    v-for="item in computedItemsOnCart"
                    :key="item.id"
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
                        <div class="cell-center">
                            <CustomButton
                                :color="'blue'"
                                :class="'w-8 h-8'"
                                :disabled="item.quantity <= 1"
                                @click="onDecreaseQuantity(item)"
                            >
                                <object v-html="minusIco" v-once />
                            </CustomButton>
                            <span class="w-8 h-8 cell-center">{{
                                item.quantity
                            }}</span>
                            <CustomButton
                                :color="'blue'"
                                :class="'w-8 h-8'"
                                :disabled="item.quantity >= 10"
                                @click="onIncreaseQuantity(item)"
                            >
                                <object v-html="plusIco" v-once />
                            </CustomButton>
                            <CustomButton
                                :color="'red'"
                                :class="'w-8 h-8 ml-2'"
                                @click="onRemoveFromCart(item)"
                            >
                                <object v-html="removeFromCartIco" v-once />
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
                <CustomButton
                    :color="'green'"
                    :class="'w-full p-2 font-semibold'"
                    :contentAlign="'evenly'"
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
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";
import removeFromCartIco from "@/assets/removeFromCart.svg?raw";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import LockIco from "@/assets/lock.svg?raw";
import { useCart } from "@/composables/useCart";

// Router navigation composable
const { navigateToCheckout } = useRouterNavigation();

// Cart composable
const {
    cart,
    removeFromCart,
    increaseProductQty,
    decreaseProductQty,
    totalCartValue,
    totalItemsInCart,
} = useCart();

// Filter items with quantity greater than 0
const computedItemsOnCart = computed(() => {
    console.log("Filter items with quantity greater than 0");
    console.log(cart.value);
    const filteredItems = cart.value.filter((item) => item.quantity > 0);
    console.log(filteredItems);
    return filteredItems;
});

// Watch the total cost and total items on cart
const total = computed(() => totalCartValue.value);
const totalItems = computed(() => totalItemsInCart.value);

// Decrease quantity of an item
function onDecreaseQuantity(item) {
    console.log("Decrease quantity of item", item);
    decreaseProductQty(item);
}

// Increase quantity of an item
function onIncreaseQuantity(item) {
    console.log("Increase quantity of item", item);
    increaseProductQty(item);
}

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
