import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/IndexView.vue";
import Checkout from "@/views/CheckoutView.vue";
import Payment from "@/views/PaymentView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Index,
        },
        {
            path: "/checkout",
            name: "Checkout",
            component: Checkout,
        },
        {
            path: "/payment",
            name: "Payment",
            component: Payment,
        },
    ],
});

export default router;
