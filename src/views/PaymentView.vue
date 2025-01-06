<template>
    <div
        class="flex flex-col items-center justify-center h-screen screen-height"
    >
        <div
            class="w-[90%] h-full mx-4 overflow-y-auto bg-gray-100 shadow-xl p-4"
        >
            <!-- Dropdown to select if the payment method is by card or PIX -->
            <div class="flex justify-center mt-4">
                <div class="w-full max-w-md">
                    <label
                        for="payment-method"
                        class="text-sm font-medium text-gray-700 rounded-md"
                        >Payment method</label
                    >
                    <select
                        id="payment-method"
                        v-model="paymentMethod"
                        name="payment-method"
                        class="w-full p-2 mt-1 text-base border border-gray-300 rounded-md sm:text-sm"
                    >
                        <option value="card">Credit Card</option>
                        <option value="pix">PIX</option>
                    </select>
                </div>
            </div>

            <!-- Card payment -->
            <div v-if="paymentMethod === 'card'" class="mt-4">
                <CardPaymentArea @update-card-data="onUpdateCardData" />
            </div>

            <!-- PIX payment -->
            <div v-else-if="paymentMethod === 'pix'" class="mt-4">
                Unavailable
            </div>

            <!-- Payment button -->
            <div class="flex justify-center mt-4">
                <CustomButton
                    color="green"
                    :class="'w-full max-w-md p-2 font-semibold gap-2'"
                    :contentAlign="'center'"
                    :disabled="totalCartValue <= 0 || !isPaymentDataValid"
                    @click="onPay"
                >
                    <object v-html="LockIcon" v-once />
                    Pay - ${{ totalCartValue.toFixed(2) }}
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import CardPaymentArea from "@/components/CardPaymentArea.vue";
import CustomButton from "@/components/CustomButton.vue";
import LockIcon from "@/assets/lock.svg?raw";
import { useCart } from "@/composables/useCart";
import { useCheckout } from "@/composables/useCheckout";
import { useRouterNavigation } from "@/composables/useRouterNavigation";

// Cart composable
const { totalCartValue, cart, clearCart } = useCart();

// Checkout composable
const { checkout, error: checkoutError } = useCheckout();

// Router navigation composable
const { navigateToProducts } = useRouterNavigation();

// Get the payment method from the dropdown
const paymentMethod = ref("card");

// Check if the payment data is valid
const isPaymentDataValid = ref(false);

const paymentData = ref({});

// Update card data
const onUpdateCardData = (data) => {
    paymentData.value = data;
    paymentData.value.amount = totalCartValue.value;
    paymentData.value.type = "card";

    console.log("Payment data", paymentData.value);

    isPaymentDataValid.value = data.valid === true;
};

// Payment function
const onPay = async () => {
    if (paymentMethod.value === "card") {
        await checkout(cart.value, paymentData.value);

        if (!checkoutError.value) {
            alert("Payment successful!");
            clearCart();
            await navigateToProducts();
        } else {
            alert("Payment failed. Please try again.");
        }
    } else if (paymentMethod.value === "pix") {
        console.log("Currently unavailable");
    }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
