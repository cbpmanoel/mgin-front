import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/ProductsView.vue"),
            meta: { title: "Products" },
        },
        {
            path: "/cart",
            name: "cart",
            component: () => import("@/views/CartView.vue"),
            meta: { title: "Your Cart" },
        },
        {
            path: "/checkout",
            name: "checkout",
            component: () => import("@/views/PaymentView.vue"),
            meta: { title: "Checkout" },
        },
    ],
});

export default router;
