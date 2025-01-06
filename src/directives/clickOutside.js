// Directive to detect clicks outside an element
export const clickOutside = {
    beforeMount(el, binding) {
        // Define the click handler
        el.clickOutsideEvent = (event) => {
            // Check if the click is outside the element
            if (!(el === event.target || el.contains(event.target))) {
                // Call the provided method
                binding.value();
            }
        };
        // Attach the event listener
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        // Clean up the event listener
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};
