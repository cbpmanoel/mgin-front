// Debounce function to run a function after a delay
const runWithDebounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export default runWithDebounce;
