import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Products",
            component: () => import("@/views/ProductsView.vue"),
        },
        {
            path: "/cart",
            name: "Your Cart",
            component: () => import("@/views/CartView.vue"),
        },
        {
            path: "/checkout",
            name: "Checkout",
            component: () => import("@/views/PaymentView.vue"),
        },
    ],
});

export default router;
