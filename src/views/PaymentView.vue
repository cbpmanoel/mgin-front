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
            <div
                v-if="paymentMethod === 'card'"
                class="flex justify-center mt-4"
            >
                <CustomButton
                    color="green"
                    :class="'w-full max-w-md p-2 font-semibold gap-2'"
                    :contentAlign="'center'"
                    :disabled="disablePaymentButton"
                    @click="onPay"
                >
                    <object v-html="LockIcon" v-once />
                    {{ paymentButtonText }}
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CardPaymentArea from "@/components/CardPaymentArea.vue";
import CustomButton from "@/components/CustomButton.vue";
import LockIcon from "@/assets/lock.svg?raw";
import { useCart } from "@/composables/useCart";
import { useOrderProcessing } from "@/composables/useOrderProcessing";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useOrderBuilder } from "@/composables/useOrderBuilder";

// Cart composable
const { totalCartValue, clearCart, getProductsOnCart } = useCart();

// Checkout composable
const { processOrder, error: checkoutError, isLoading: isProcessingOrder } =
    useOrderProcessing();

// Router navigation composable
const { navigateToProducts } = useRouterNavigation();

// Get the payment method from the dropdown
const paymentMethod = ref("card");

// Check if the payment data is valid
const isPaymentDataValid = ref(false);
const paymentData = ref({});

// Disable payment button if the cart is empty, the payment data is invalid, or the order is being processed
const disablePaymentButton = computed(() => totalCartValue.value <= 0 || !isPaymentDataValid.value || isProcessingOrder.value);

// PaymentButton text
const paymentButtonText = computed(() => isProcessingOrder.value ? "Processing..." : `Pay - $${totalCartValue.value.toFixed(2)}`);

// Order Builder
const { buildOrder } = useOrderBuilder();

// Update card data
const onUpdateCardData = (data) => {
    // Update the payment data if the card data is valid
    if (data.valid === true) {
        paymentData.value = data;
        paymentData.value.amount = totalCartValue.value;
        paymentData.value.type = "card";

        console.log("Payment data", paymentData.value);
    }

    isPaymentDataValid.value = data.valid === true;
};

// Payment function
const onPay = async () => {
    try {
        // Build the order
        const itemsOnCart = getProductsOnCart();
        const order = buildOrder(itemsOnCart, paymentData.value);

        console.log("Order", order);

        if (paymentMethod.value === "card") {
            // Execute the order 66
            await processOrder(order);

            // Clear the cart and navigate to the products page if the payment was successful
            if (!checkoutError.value) {
                alert("Payment successful!");
                clearCart();
                await navigateToProducts();
            } else {
                alert("Payment failed. Please try again.");
            }
        }
        // PIX payment method is not available
        else if (paymentMethod.value === "pix") {
            console.log("Currently unavailable");
        }
    } catch (error) {
        console.error("Error on payment", error);
    }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
