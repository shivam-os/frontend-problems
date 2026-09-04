// 1. Basic debounce
function debounce(cb, delay = 500) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => cb.apply(this, args), delay);
    }
}

// 2. Basic throttle
function throttle(cb, delay = 500) {
    let lastExecuted = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastExecuted < delay) return;
        lastExecuted = now;
        cb.apply(this, args);
    }
}

function throttleV2(cb, delay = 500) {
    let timer;
    return function(...args) {
        if (timer) return;
        cb.apply(this, args);
        timer = setTimeout(() => timer = undefined, delay);
    }
}

// 3. Sleep utility (which can be used to pause the execution of a function)
function sleep(delay = 1000) {
    return new Promise((res) => setTimeout(res, delay));
}