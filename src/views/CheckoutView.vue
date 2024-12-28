<template>
    <div class="flex w-full h-screen p-4 bg-gray-800">
        <div class="w-3/4">
            <ListContainer>
                <h1 v-if="itemsOnCheckout.length === 0">Your cart is empty</h1>
                <div
                    v-for="item in itemsOnCheckout"
                    :key="item.id"
                    class="custom-list-item"
                >
                    <div class="p-2 custom-list-item-content">
                        <div class="font-semibold">{{ item.name }}</div>
                        <p>${{ (item.price * item.qty).toFixed(2) }}</p>
                        <!-- Quantity area -->
                        <div class="quantity-area">
                            <button
                                @click="decreaseQuantity(item)"
                                class="button quantity-button"
                            >
                                <object v-html="minusIco" />
                            </button>
                            <span class="quantity-text">{{ item.qty }}</span>
                            <button
                                :disabled="disableIncrease"
                                @click="increaseQuantity(item)"
                                class="button quantity-button"
                            >
                                <object v-html="plusIco" />
                            </button>
                            <button
                                class="ml-2 button remove-from-cart-button"
                                @click="removeFromCart(item)"
                            >
                                <object v-html="removeFromCartIco" />
                            </button>
                        </div>
                    </div>
                </div>
            </ListContainer>
        </div>
        <div class="w-1/4 p-2 ml-4 bg-white rounded-md shadow-md">
            <div title="Order Summary">
                <p>Total Items: {{ totalItemsOnCheckout }}</p>
                <p>Total: ${{ total.toFixed(2) }}</p>
                <button
                    class="w-full mt-2 button"
                    @click="router.push({ name: 'payment' })"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ListContainer from "@/components/ListContainer.vue";
import minusIco from "@/assets/minus.svg?raw";
import plusIco from "@/assets/plus.svg?raw";
import removeFromCartIco from "@/assets/removeFromCart.svg?raw";
import { useRouter } from "vue-router";

const itemsOnCheckout = ref([]);

for (let i = 0; i < 50; i++) {
    itemsOnCheckout.value.push({
        id: i,
        name: `Item ${i}`,
        price: Math.floor(Math.random() * 100),
        qty: Math.floor(Math.random() * 10),
    });
}

// Router instance
const router = useRouter();

// Calculate the total price of all items in the cart
const total = computed(() =>
    itemsOnCheckout.value.reduce((acc, item) => acc + item.price * item.qty, 0),
);

const totalItemsOnCheckout = computed(() =>
    itemsOnCheckout.value.reduce((acc, item) => acc + item.qty, 0),
);

// Disable increase button if quantity is 10
const disableIncrease = computed(() => itemsOnCheckout.value.qty === 10);

// Decrease quantity of an item
function decreaseQuantity(item) {
    console.log("Decrease quantity of item", item);

    // Decrease quantity of the item
    item.qty--;

    // If quantity is 0, remove the item from the cart
    if (item.qty === 0) {
        removeFromCart(item);
    }
}

// Increase quantity of an item
function increaseQuantity(item) {
    console.log("Increase quantity of item", item);

    // Increase quantity of the item
    if (item.qty < 10) {
        item.qty++;
    }
}

// Remove an item from the cart
function removeFromCart(item) {
    console.log("Remove item from cart", item);

    // Find the index of the item in the cart
    const index = itemsOnCheckout.value.findIndex((i) => i.id === item.id);

    // Remove the item from the cart
    itemsOnCheckout.value.splice(index, 1);
}
</script>

<style scoped>
.custom-list-item {
    @apply bg-white shadow-md rounded-md w-full;
}

.custom-list-item-content {
    @apply flex items-center justify-between h-10;
}

.quantity-text {
    @apply text-lg font-semibold w-8 text-center;
}

.quantity-area {
    @apply flex items-center justify-end w-1/4 h-full;
}
</style>
