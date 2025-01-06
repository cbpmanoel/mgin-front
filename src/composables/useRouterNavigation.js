import { useRouter } from "vue-router";

const router = useRouter();

export const useRouterNavigation = () => {
    // Navigate to the cart page
    const navigateToCart = async () => {
        try {
            await router.push({ name: "cart" });
            return true;
        } catch (error) {
            console.error("Navigation failed:", error);
            return false;
        }
    };

    // Navigate to the products page
    const navigateToProducts = async () => {
        try {
            await router.push({ name: "home" });
            return true;
        } catch (error) {
            console.error("Navigation failed:", error);
            return false;
        }
    };

    // Navigate to the checkout page
    const navigateToCheckout = async () => {
        try {
            await router.replace({ name: "checkout" });
            return true;
        } catch (error) {
            console.error("Navigation failed:", error);
            return false;
        }
    };

    // Go back to the previous page
    const goBack = () => {
        router.back();
    };

    return {
        goBack,
        navigateToCart,
        navigateToProducts,
        navigateToCheckout,
        router,
    };
};
