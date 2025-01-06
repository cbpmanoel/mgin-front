<template>
    <!-- Card payment area -->
    <div class="card-payment">
        <!-- Card number with validation and spaces each 4 numbers -->
        <div class="mb-2">
            <input
                type="text"
                v-model="cardNumber"
                @input="formatCardNumber"
                class="input"
                placeholder="Card number"
                maxlength="19"
            />
            <span v-if="cardNumberError" class="text-sm text-red-500"
                >Invalid card number</span
            >
        </div>

        <!-- Card holder name -->
        <div class="mb-2">
            <input
                type="text"
                v-model="cardHolderName"
                @input="validateCardHolderName"
                class="input"
                placeholder="Card holder name"
            />
            <span v-if="cardHolderNameError" class="text-sm text-red-500">
                Invalid card holder name</span
            >
        </div>

        <!-- Card expiration date, two dropdowns from current month and year to 10 years -->
        <div class="mb-2">
            <div class="flex gap-2">
                <select v-model="expirationMonth" class="input">
                    <option v-for="month in months" :key="month" :value="month">
                        {{ month }}
                    </option>
                </select>

                <select v-model="expirationYear" class="input">
                    <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select>
            </div>
            <span v-if="expirationDateError" class="text-sm text-red-500">
                Invalid expiration date</span
            >
        </div>

        <!-- CVV -->
        <div class="mb-2">
            <input
                type="text"
                v-model="cvv"
                @input="validateCVV"
                class="input"
                placeholder="CVV"
                maxlength="3"
            />
            <span v-if="cvvError" class="text-sm text-red-500"
                >Invalid CVV</span
            >
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const emit = defineEmits(["update-card-data", "update-card-errors"]);

// State
const cardNumber = ref("");
const cardHolderName = ref("");
const expirationMonth = ref("");
const expirationYear = ref("");
const cvv = ref("");

// Error states
const cardNumberError = ref(null);
const cardHolderNameError = ref(null);
const cvvError = ref(null);
const expirationDateError = ref(null);

// Months and years for expiration date
const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i));

// Card number validation and formatting
const formatCardNumber = () => {
    // Remove non-numeric characters
    cardNumber.value = cardNumber.value.replace(/\D/g, "");

    // Add spaces every 4 digits
    cardNumber.value = cardNumber.value.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Validate card number length (16 digits)
    cardNumberError.value = cardNumber.value.replace(/\s/g, "").length !== 16;
};

// Card holder name validation
const validateCardHolderName = () => {
    // Remove non-alphabetic characters
    cardHolderName.value = cardHolderName.value.replace(/[^a-zA-Z\s]/g, "");

    // Put all characters in uppercase
    cardHolderName.value = cardHolderName.value.toUpperCase();

    // Validate card holder name length (at least 3 characters)
    cardHolderNameError.value = cardHolderName.value.length < 3;
};

// CVV validation
const validateCVV = () => {
    // Remove non-numeric characters
    cvv.value = cvv.value.replace(/\D/g, "");

    // Validate CVV length (3 or 4 digits)
    cvvError.value = cvv.value.length !== 3;
};

// Watch for changes in expiration month and year
watch([expirationMonth, expirationYear], () => {
    if (expirationMonth.value && expirationYear.value) {
        const currentDate = new Date();

        // Create a date object with the selected month and year, and day 1
        const selectedDate = new Date(
            `${expirationYear.value}-${expirationMonth.value}-01`,
        );

        // Check if the selected date is in the past
        expirationDateError.value = selectedDate < currentDate;
    }
});

// Form validation state
const isFormValid = computed (() => {
    return (
        cardNumberError.value === false &&
        cardHolderNameError.value === false &&
        cvvError.value === false &&
        expirationDateError.value === false &&
        cardNumber.value.trim() !== "" &&
        cardHolderName.value.trim() !== "" &&
        expirationMonth.value.trim() !== "" &&
        expirationYear.value.trim() !== "" &&
        cvv.value.trim() !== ""
    );
});

// Emit form data to parent component
const emitFormData = () => {
    emit("update-card-data", {
        cardNumber: cardNumber.value.replace(/\s/g, ""), // Remove spaces
        cardHolderName: cardHolderName.value,
        expirationMonth: expirationMonth.value,
        expirationYear: expirationYear.value,
        cvv: cvv.value,
        valid: isFormValid.value,
    });
};

// Emit form data when the form validity changes
watch(
    isFormValid,
    () => {
        emitFormData();
    },
    { immediate: true },
);
</script>

<style scoped>
.card-payment {
    @apply max-w-md mx-auto p-6 bg-white rounded-lg shadow-md;
}

.input {
    @apply w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md sm:text-sm;
}
</style>
