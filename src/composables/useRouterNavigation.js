import { useRouter } from "vue-router";

export const useRouterNavigation = () => {
    const router = useRouter();

    const navigateToCart = async () => {
        try {
            await router.push({ name: "cart" });
            return true;
        } catch (error) {
            console.error("Navigation failed:", error);
            return false;
        }
    };

    const navigateToProducts = async () => {
        try {
            await router.push({ name: "home" });
            return true;
        } catch (error) {
            console.error("Navigation failed:", error);
            return false;
        }
    };

    const navigateToCheckout = async () => {
        try {
            await router.replace({ name: "checkout" });
            return true;
        } catch (error) {
            console.error("Navigation failed:", error);
            return false;
        }
    };

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
