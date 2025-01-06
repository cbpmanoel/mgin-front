import { ref, computed } from "vue";
import runWithDebounce from "@/utils/runWithDebounce";

// Key for localStorage
const CART_STORAGE_KEY = "cart_v1";

// Save cart to localStorage
function saveCartToLocalStorage() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.value));
    } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
    }
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            cart.value = JSON.parse(storedCart);
        }
    } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
    }
}

// Cart state
const cart = ref({});

export const useCart = () => {
    // Initialize the cart from localStorage
    loadCartFromLocalStorage();

    // Get all products in the cart
    const getProductsOnCart = () => {
        return Object.values(cart.value);
    };

    // Validate a product object
    function validateProduct(product) {
        if (!product.id) {
            throw new Error(
                "Product must have an id: " + JSON.stringify(product),
            );
        }
        if (Number.isNaN(product.price) || product.price <= 0) {
            throw new Error("Product must have a price greater than 0");
        }
        if (!product.name) {
            throw new Error("Product must have a name");
        }
    }

    // Find a product in the cart by its ID
    function findProduct(product) {
        return cart.value[product.id];
    }

    // Create a product object with a default quantity of 1
    function createProduct(product, quantity = 1) {
        return {
            ...product,
            quantity: quantity,
        };
    }

    // Add a product to the cart
    const addToCart = (product) => {
        updateProductQty(product, 1);
    };

    // Check if the cart contains a product
    const containsProduct = (product) => {
        return !!cart.value[product.id];
    };

    // Get the quantity of a product in the cart
    const getProductQty = (product) => {
        const existingProduct = findProduct(product);
        return existingProduct ? existingProduct.quantity : 0;
    };

    // Remove a product from the cart
    const removeFromCart = (product) => {
        updateProductQty(product, 0);
    };

    // Increase the quantity of a product in the cart
    const increaseProductQty = (product, amount = 1) => {
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }

        const existingProduct = findProduct(product);
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + amount;
            updateProductQty(product, newQuantity);
        }
    };

    // Decrease the quantity of a product in the cart
    const decreaseProductQty = (product, amount = 1) => {
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }

        const existingProduct = findProduct(product);
        if (existingProduct) {
            const newQuantity = existingProduct.quantity - amount;
            updateProductQty(product, newQuantity);
        }
    };

    // Update the quantity of a product in the cart
    const updateProductQty = (product, quantity) => {
        validateProduct(product);
        const existingProduct = findProduct(product);

        // If the quantity is 0 or negative, remove the product from the cart
        if (quantity <= 0) {
            delete cart.value[product.id];
        }
        // If the product is not in the cart, add it
        else if (!existingProduct) {
            cart.value[product.id] = createProduct(product, quantity);
        }
        // Otherwise, update the quantity of the product in the cart
        else {
            cart.value[product.id] = {
                ...existingProduct,
                quantity,
            };
        }

        // Save the updated cart to localStorage
        runWithDebounce(saveCartToLocalStorage)();
    };

    // Clear the cart
    const clearCart = () => {
        console.log("Clearing cart");
        cart.value = {};

        // Save the cleared cart to localStorage
        saveCartToLocalStorage();
        console.log("Cart cleared:", cart.value);
    };

    // Compute the total value of the cart
    const totalCartValue = computed(() => {
        return Object.values(cart.value).reduce(
            (total, product) => total + product.price * product.quantity,
            0,
        );
    });

    // Compute the total number of items in the cart
    const totalItemsInCart = computed(() => {
        return Object.values(cart.value).reduce(
            (total, product) => total + product.quantity,
            0,
        );
    });

    return {
        // state
        cart,

        // methods
        getProductsOnCart,
        addToCart,
        removeFromCart,
        increaseProductQty,
        decreaseProductQty,
        updateProductQty,
        clearCart,
        containsProduct,
        getProductQty,

        // computed properties
        totalCartValue,
        totalItemsInCart,
    };
};
