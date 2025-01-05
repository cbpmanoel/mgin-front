<template>
    <div>
        <!-- Product quantity selection modal -->
        <transition name="modal">
            <div :key="showSelectItemQtyModal">
                <ModalWindow
                    v-if="showSelectItemQtyModal"
                    @clicked-outside="showSelectItemQtyModal = false"
                >
                    <ProductQuantitySelect
                        :name="selectedItem.name"
                        :image="selectedItem.imageSrc"
                        :quantity="selectedItem.quantity"
                        @confirm="onQuantitySelectorConfirm"
                        @cancel="showSelectItemQtyModal = false"
                    />
                </ModalWindow>
            </div>
        </transition>

        <!-- Toggle Button for Sidebar (Visible only on xs screens) -->
        <button
            @click="toggleSidebar"
            class="fixed z-50 p-2 text-white bg-gray-800 rounded-lg shadow-lg top-4 left-4 sm:hidden"
        >
            {{ isSidebarVisible ? "Hide" : "Show" }} Menu
        </button>

        <!-- Side panel: Categories and Checkout area -->
        <div class="flex w-full p-2 screen-height">
            <!-- Sidebar (Hidden on xs screens by default) -->
            <div
                ref="sidebar"
                :class="[
                    'absolute flex-shrink-0 w-80 transition-transform duration-300 ease-in-out',
                    { '-translate-x-full': !isSidebarVisible },
                    { 'z-40': isSidebarVisible },
                    'sm:translate-x-0',
                ]"
            >
                <SidePanel
                    :categories="categories"
                    :totalItems="totalItems"
                    :totalPrice="totalPrice"
                    @scroll-to-category="scrollTo"
                    @navigate-to-cart="onNavigateToCart"
                />
            </div>

            <!-- Main content: Products separated by category -->
            <!-- Category ref is used to scroll to the category section -->
            <div
                class="w-full mx-4 overflow-y-auto bg-gray-100 shadow-xl"
                :class="['sm:ml-[21rem] sm:w-[calc(100%-20rem)]']"
            >
                <div
                    v-for="category in productList"
                    :key="category.category"
                    class="bg-gray-100 main-content"
                    :ref="setCategoryRef(category.category)"
                >
                    <div v-if="category.items.length > 0" class="mb-10">
                        <!-- Item cards -->
                        <FlexContainer>
                            <template #header>
                                <h2 class="text-2xl font-bold">
                                    {{ category.category }}
                                </h2>
                            </template>
                            <template #body>
                                <ItemCard
                                    v-for="item in category.items"
                                    :key="item.id"
                                    :id="item.id"
                                    :categoryId="item.categoryId"
                                    :description="item.name"
                                    :price="item.price"
                                    :imageSrc="item.imageSrc"
                                    :quantity="getProductQty(item)"
                                    @add-to-cart="onAddToCartClicked"
                                    @remove-from-cart="onRemoveFromCartClicked"
                                />
                            </template>
                        </FlexContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, toRaw } from "vue";
import SidePanel from "@/components/SidePanel.vue";
import ItemCard from "@/components/ItemCard.vue";
import FlexContainer from "@/components/FlexContainer.vue";
import { useCart } from "@/composables/useCart";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useCategories } from "@/composables/useCategories";
import { useProducts } from "@/composables/useProducts";
import ProductQuantitySelect from "@/components/ProductQuantitySelect.vue";
import ModalWindow from "@/components/ModalWindow.vue";

// Modal controllers
const showSelectItemQtyModal = ref(false);
const selectedItem = ref({});

// Sidebar visibility
const isSidebarVisible = ref(false); // Hidden by default on xs screens
const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};

// Cart composable
const cart = useCart();
const { totalCartValue, totalItemsInCart } = cart;
const { updateProductQty, getProductQty } = cart;

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

// Update the item's quantity
function onQuantitySelectorConfirm(payload) {
    updateProductQty(toRaw(selectedItem.value), payload.quantity);
    showSelectItemQtyModal.value = false;
}

// Add item to cart
function onAddToCartClicked(payload) {
    selectedItem.value = {
        id: payload.id,
        categoryId: payload.categoryId,
        price: payload.price,
        name: payload.name,
        imageSrc: payload.imageSrc || "https://placehold.co/400x400/red/white",
        quantity: payload.quantity,
    };
    showSelectItemQtyModal.value = true;
}

// Remove item from cart
function onRemoveFromCartClicked() {
    updateProductQty(toRaw(selectedItem.value), 0);
}

// Navigate to the cart view
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
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
