import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore(
    "cart",
    () => {
        // Cart Object
        const cart = ref(new Map());

        // Validate a product object
        function validateProduct(product) {
            if (!product.id || !product.categoryId) {
                throw new Error("Product must have an id and a categoryId");
            }
            if (!product.price || product.price <= 0) {
                throw new Error("Product must have a price greater than 0");
            }
            if (!product.name) {
                throw new Error("Product must have a name");
            }
        }

        // Returns a unique identifier for a product based on its id and categoryId
        function getProductUniqueId(product) {
            return `${product.categoryId}-${product.id}`;
        }

        // Find a product in the cart
        function findProduct(product) {
            return cart.value.get(getProductUniqueId(product));
        }

        // Create product object
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
            return findProduct(product) !== undefined;
        };

        // Remove the product from the cart
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
                updateProductQty(product, existingProduct.quantity + amount);
            }
        };

        // Decrease the quantity of a product in the cart
        const decreaseProductQty = (product, amount = 1) => {
            if (amount <= 0) {
                throw new Error("Amount must be greater than 0");
            }

            const existingProduct = findProduct(product);
            if (existingProduct) {
                updateProductQty(product, existingProduct.quantity - amount);
            }
        };

        // Update the quantity of a product in the cart
        const updateProductQty = (product, quantity) => {
            validateProduct(product);
            const existingProduct = findProduct(product);

            // If the quantity is 0 or negative, remove the product from the cart
            if (quantity <= 0) {
                cart.value.delete(getProductUniqueId(product));
            }
            // If the product is not in the cart, add it
            else if (!existingProduct) {
                cart.value.set(
                    getProductUniqueId(product),
                    createProduct(product, quantity),
                );
            }
            // Otherwise, update the quantity of the product in the cart
            else {
                cart.value.set(getProductUniqueId(product), {
                    ...existingProduct,
                    quantity,
                });
            }
        };

        // Clear the cart
        const clearCart = () => {
            cart.value.clear();
        };

        // Compute the total value of the cart
        const totalCartValue = computed(() => {
            return Array.from(cart.value.values()).reduce(
                (total, product) => total + product.price * product.quantity,
                0,
            );
        });

        // Compute the total number of items in the cart
        const totalItemsInCart = computed(() => {
            return Array.from(cart.value.values()).reduce(
                (total, product) => total + product.quantity,
                0,
            );
        });

        return {
            // state
            cart,

            // methods
            addToCart,
            removeFromCart,
            increaseProductQty,
            decreaseProductQty,
            updateProductQty,
            clearCart,
            containsProduct,

            // computed properties
            totalCartValue,
            totalItemsInCart,
        };
    },
    {
        // Persist the cart between page reloads
        persist: {
            enabled: true,
        },
    },
);
