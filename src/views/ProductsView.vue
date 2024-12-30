<template>
    <div>
        <transition name="modal">
            <div :key="showModal">
                <ModalWindow
                    v-if="showModal"
                    @clicked-outside="showModal = false"
                >
                    <ProductQuantitySelect
                        :itemName="selectedItem.name"
                        :itemImage="selectedItem.imageSrc"
                        :itemQuantity="selectedItem.quantity"
                        @confirm="onQuantitySelectorConfirm"
                        @cancel="showModal = false"
                    />
                </ModalWindow>
            </div>
        </transition>
        <!-- Side panel: Categories and Checkout area -->
        <div class="flex w-full p-2 screen-height">
            <div class="flex-shrink-0 w-1/4 min-w-0">
                <SidePanel
                    :categories="categories"
                    :totalItems="totalItems"
                    :totalPrice="totalPrice"
                    @scroll-to="scrollTo"
                    @navigate-to-cart="onNavigateToCart"
                />
            </div>

            <!-- Main content: Products separated by category -->
            <!-- Category ref is used to scroll to the category section -->
            <div class="w-3/4 ml-4 overflow-y-auto bg-gray-100 shadow-xl">
                <div
                    v-for="category in productList"
                    :key="category.category"
                    class="bg-gray-100 main-content"
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
                                @add-to-cart="onAddToCart"
                            />
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import SidePanel from "@/components/SidePanel.vue";
import ItemCard from "@/components/ItemCard.vue";
import GridContainer from "@/components/GridContainer.vue";
import { useCart } from "@/composables/useCart";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useCategories } from "@/composables/useCategories";
import { useProducts } from "@/composables/useProducts";
import ProductQuantitySelect from "@/components/ProductQuantitySelect.vue";
import ModalWindow from "@/components/ModalWindow.vue";

// Modal controllers
const showModal = ref(true);

// Dummy selected item
const selectedItem = ref({
    name: "Product name",
    imageSrc: "https://placehold.co/400x400/orange/white",
    quantity: 4,
});

// Cart composable
const { totalCartValue, totalItemsInCart, updateProductQty /* addToCart */ } =
    useCart();

// Computed properties for cart
const totalItems = computed(() => totalItemsInCart.value);
const totalPrice = computed(() => totalCartValue.value);

// Router navigation
const { navigateToCart } = useRouterNavigation();

// Create a ref object to hold category refs - needed for scrolling
const categoryRefs = ref({});

// Categories and products composables
const { categories } = useCategories();
const { products } = useProducts();

// Group items by category
const productList = computed(() => {
    const dict = {};

    // Create a dictionary with category as key and items as value
    products.value.forEach((item) => {
        if (!dict[item.categoryId]) {
            dict[item.categoryId] = [];
        }

        dict[item.categoryId].push(item);
    });

    // Convert the dictionary to an array of objects
    return categories.value.map((cat) => {
        return {
            category: cat.name,
            items: dict[cat.id] || [],
        };
    });
});

// Callbacks
function onQuantitySelectorConfirm(payload) {
    // Update the item's quantity
    updateProductQty(
        {
            id: payload.id,
            categoryId: payload.categoryId,
            price: payload.price,
            name: payload.name,
        },
        payload.quantity,
    );

    // Hide the modal
    showModal.value = false;
}

function onAddToCart(payload) {
    console.log("Add to cart");
    console.log(payload);

    console.log("Update product quantity");
    updateProductQty(
        {
            id: payload.id,
            categoryId: payload.categoryId,
            price: payload.price,
            name: payload.name,
        },
        payload.quantity,
    );
}

function onNavigateToCart() {
    navigateToCart();
}

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
</script>

<style scoped>
.main-content {
    @apply justify-center items-center p-4;
}

/* Smooth fade + slight scale effect */
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
