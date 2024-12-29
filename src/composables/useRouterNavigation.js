import { useRouter } from "vue-router";

export const useRouterNavigation = () => {
    const router = useRouter();

    const navigateToCart = () => {
        console.log("Proceeding to checkout");
        router.push("/cart");
    };

    const navigateToProducts = () => {
        console.log("Proceeding to products");
        router.push("/");
    };

    const navigateToCheckout = () => {
        console.log("Proceeding to checkout");
        router.push("/checkout");
    };

    return { navigateToCart, navigateToProducts, navigateToCheckout, router };
};
