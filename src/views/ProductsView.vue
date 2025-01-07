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
        <button @click.stop="toggleSidebar" class="sidebar-button">
            {{ isSidebarVisible ? "< Hide" : "> Show" }} Menu
        </button>

        <div class="flex w-full p-2 screen-height">
            <!-- Sidebar (Hidden on xs screens by default) -->
            <div
                ref="sidebar"
                v-click-outside="closeSidebar"
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
                <div v-if="productList.length === 0" class="p-4 text-center">
                    <p class="text-lg font-semibold">
                        No products found. Please check back later.
                    </p>
                </div>
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
                                <CategoryHeader
                                    :name="category.category"
                                    :imageSrc="
                                        imageUrl[category.imageSrc] ||
                                        noImageFound
                                    "
                                />
                            </template>
                            <template #body>
                                <ItemCard
                                    v-for="item in category.items"
                                    :key="item.id"
                                    :id="item.id"
                                    :categoryId="item.category_id"
                                    :description="item.name"
                                    :price="item.price"
                                    :imageSrc="
                                        imageUrl[category.imageSrc] ||
                                        noImageFound
                                    "
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
import { computed, ref, toRaw, watch } from "vue";
import SidePanel from "@/components/SidePanel.vue";
import ItemCard from "@/components/ItemCard.vue";
import FlexContainer from "@/components/FlexContainer.vue";
import { useCart } from "@/composables/useCart";
import { useRouterNavigation } from "@/composables/useRouterNavigation";
import { useCategories } from "@/composables/useCategories";
import { useCategoryItems } from "@/composables/useCategoryItems";
import ProductQuantitySelect from "@/components/ProductQuantitySelect.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import CategoryHeader from "@/components/CategoryHeader.vue";
import { useImageLoader } from "@/composables/useImageLoader";
import noImageFound from "@/assets/no-image-found.jpg";

// Modal controllers
const showSelectItemQtyModal = ref(false);
const selectedItem = ref({});

// Sidebar visibility
const isSidebarVisible = ref(false); // Hidden by default on xs screens
const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
    if (isSidebarVisible.value) {
        isSidebarVisible.value = false;
    }
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
const {
    categories,
    // isLoading: categoriesLoading,
    // error: categoriesError,
    fetchCategories,
} = useCategories();
const {
    categoryItems,
    // isLoading: itemsLoading,
    // error: itemsError,
    fetchCategoryItems,
} = useCategoryItems();

// Fetch categories when the component is mounted
fetchCategories();

// Watch for changes in categories and fetch items for each category
const productList = ref([]);
watch(
    () => categories.value,
    async (newCategories) => {
        if (newCategories.length > 0) {
            const itemsByCategory = [];

            console.log(`Found ${newCategories.length} categories`);

            // Fetch items for each category
            for (const category of newCategories) {
                await fetchCategoryItems(category.id);

                if (!categoryItems.value[category.id]) {
                    console.warn(
                        `No items found for category: ${category.name}`,
                    );
                    continue;
                }

                itemsByCategory.push({
                    category: category.name,
                    imageSrc: category.image_id,
                    items: categoryItems.value[category.id] || [],
                });
            }

            productList.value = itemsByCategory;
        }
    },
    { immediate: true },
);

// Image Loader composable
const { loadImage } = useImageLoader();
const imageUrl = ref({});

// Preload images for all categories and items
const preloadImages = async () => {
    for (const category of productList.value) {
        // Preload category image
        const categoryImageId = category.imageSrc;
        if (!imageUrl.value[categoryImageId]) {
            try {
                const url = await loadImage(categoryImageId);
                imageUrl.value[categoryImageId] = url;
            } catch (error) {
                console.error("Failed to load category image", error);
                imageUrl.value[categoryImageId] = noImageFound; // Fallback to placeholder
            }
        }

        // Preload item images
        for (const item of category.items) {
            const itemImageId = item.image_id;
            if (!imageUrl.value[itemImageId]) {
                try {
                    const url = await loadImage(itemImageId);
                    imageUrl.value[itemImageId] = url;
                } catch (error) {
                    console.error("Failed to load item image", error);
                    imageUrl.value[itemImageId] = noImageFound; // Fallback to placeholder
                }
            }
        }
    }
};

watch(
    () => productList.value,
    async (newProductList) => {
        if (newProductList.length > 0) {
            await preloadImages();
        }
    },
    { immediate: true, deep: true },
);

// Callbacks

// Update the item's quantity
function onQuantitySelectorConfirm(payload) {
    updateProductQty(toRaw(selectedItem.value), payload.quantity);
    selectedItem.value.quantity = payload.quantity;

    showSelectItemQtyModal.value = false;
    alert(`${selectedItem.value.name} added to cart`);
}

// Add item to cart
function onAddToCartClicked(payload) {
    selectedItem.value = {
        id: payload.id,
        categoryId: payload.categoryId,
        price: payload.price,
        name: payload.name,
        imageSrc: payload.imageSrc,
        quantity: payload.quantity,
    };
    showSelectItemQtyModal.value = true;
}

// Remove item from cart
function onRemoveFromCartClicked() {
    updateProductQty(toRaw(selectedItem.value), 0);
    alert(`${selectedItem.value.name} removed from cart`);
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

.sidebar-button {
    @apply fixed z-50 p-2 text-white bg-gray-800 rounded-lg shadow-lg top-2 left-4 border border-gray-500 h-12 w-32 shadow-gray-900;
    @apply sm:hidden;
}
</style>
