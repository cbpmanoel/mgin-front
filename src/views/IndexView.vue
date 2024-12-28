<template>
    <!-- Side panel: Categories and Checkout area -->
    <SidePanel
        :categories="categories"
        :totalItems="totalItems"
        :totalPrice="totalPrice"
        @scroll-to="scrollTo"
        @proceed-to-checkout="proceedToCheckout"
    />

    <!-- Main content: Products separated by category -->
    <div
        v-for="category in productList"
        :key="category.category"
        class="main-content"
        :ref="setCategoryRef(category.category)"
    >
        <div v-if="category.items.length > 0" class="mb-10">
            <!-- Item cards -->
            <GridContainer :title="category.category">
                <ItemCard
                    v-for="item in category.items"
                    :key="item.id"
                    :id="item.id"
                    :categoryId="item.categoryId"
                    :description="item.name"
                    :price="item.price"
                    :imageSrc="item.imageSrc"
                />
            </GridContainer>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import SidePanel from "@/components/SidePanel.vue";
import ItemCard from "@/components/ItemCard.vue";
import GridContainer from "@/components/GridContainer.vue";
import { useCart, useCategories } from "@/composables/useCart";
import { useRouter } from "vue-router";

// Retrieve cart and categories from the composable
// Should be retrieved from the API
const { cart } = useCart();
const { categories } = useCategories();

// Create refs for total items and total price
// Used to display the order total in the sidebar
const totalItems = ref(0);
const totalPrice = ref(0);

// Create a ref object to hold category refs
const categoryRefs = ref({});

// Router instance
const router = useRouter();

// Group items by category
const productList = computed(() => {
    return categories.value.map((category) => {
        return {
            category: category.name,
            items: cart.value.filter((item) => item.categoryId === category.id),
        };
    });
});

// Store the DOM element in the refs object, needed for scrolling
const setCategoryRef = (category) => (el) => {
    if (el) {
        categoryRefs.value[category] = el;
    }
};

// Scroll to the category section
const scrollTo = (category) => {
    const element = categoryRefs.value[category];
    element?.scrollIntoView({ behavior: "smooth" });
};

// Proceed to checkout
const proceedToCheckout = () => {
    console.log("Proceeding to checkout");
    router.push("/checkout");
};
</script>

<style scoped>
.main-content {
    @apply justify-center items-center w-[80%] ml-[20%] p-4;
}
</style>
