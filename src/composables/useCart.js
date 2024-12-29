import { ref, computed } from "vue";

const cart = ref([]);

export const useCart = () => {
    // Add a product to the cart
    const addToCart = (product) => {
        const productIndex = findProductIndex(product);

        // If the product is not in the cart, add it
        if (productIndex === -1) {
            cart.value.push({ ...product, quantity: 1 });
        }

        // Otherwise, increase the quantity of the product in the cart
        else {
            cart.value[productIndex].quantity += 1;
        }
    };

    // Check if the cart contains a product
    const containsProduct = (product) => {
        return findProductIndex(product) !== -1;
    };

    // Remove the product from the cart
    const removeFromCart = (product) => {
        const productIndex = findProductIndex(product);
        if (productIndex !== -1) {
            cart.value.splice(productIndex, 1);
        }
    };

    // Increase the quantity of a product in the cart
    const increaseProductQty = (product) => {
        const productIndex = findProductIndex(product);
        if (productIndex !== -1) {
            cart.value[productIndex].quantity += 1;
        }
    };

    // Decrease the quantity of a product in the cart
    const decreaseProductQty = (product) => {
        // Decrease the quantity of the product in the cart
        const productIndex = findProductIndex(product);
        if (productIndex !== -1) {
            console.log(cart.value[productIndex]);
            if (cart.value[productIndex].quantity > 1) {
                cart.value[productIndex].quantity -= 1;
            }
            // Remove the product from the cart if its the last one
            else {
                removeFromCart(product);
            }
        }
    };

    // Update the quantity of a product in the cart
    const updateProductQty = (productId, quantity) => {
        const productIndex = findProductIndex(productId);
        if (productIndex !== -1) {
            if (quantity <= 0) {
                cart.value.splice(productIndex, 1);
            } else {
                cart.value[productIndex].quantity = quantity;
            }
        }
        // If the product is not in the cart, add it and set the quantity
        else if (quantity > 0) {
            addToCart(productId);
            updateProductQty(productId, quantity);
        }
    };

    // Clear the cart
    const clearCart = () => {
        cart.value = [];
    };

    // Compute the total value of the cart
    const totalCartValue = computed(() => {
        console.log(cart.value);
        return cart.value.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0,
        );
    });

    // Compute the total number of items in the cart
    const totalItemsInCart = computed(() => {
        return cart.value.reduce((acc, product) => acc + product.quantity, 0);
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
};

// Auxiliary function to find the index of a product in the cart
// Returns -1 if the product is not in the cart, otherwise the index
function findProductIndex(product) {
    return cart.value.findIndex(
        (p) => p.id === product.id && p.categoryId === product.categoryId,
    );
}
