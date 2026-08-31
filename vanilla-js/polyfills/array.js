// 1. Map polyfill
Array.prototype.myMap = function(cb, thisArg) {
    if (typeof cb !== 'function') throw new TypeError("Passed callback must be a function");
    const n = this.length;
    const result = new Array(n);
    
    for (let i = 0; i < n; i++) {
        if (i in this) {
            result[i] = cb.call(thisArg, this[i], i, this);
        }
    }

    return result;
}

// 2. Filter polyfill
Array.prototype.myFilter = function(cb, thisArg) {
    if (typeof cb !== 'function') throw new TypeError("Passed callback must be a function");
    const n = this.length;
    const res = [];

    for (let i = 0; i < n; i++) {
        if (i in this) {
            const isTruthy = cb.call(thisArg, this[i], i, this);
            if (isTruthy) res.push(this[i]);
        }
    }

    return result;
}

// 3. Reduce polyfill (Simplified)
Array.prototype.myReduceSimple = function(cb, initialValue) {
    const n = this.length;
    let acc = initialValue;

    for (let i = 0; i < n; i++) {
        if (i in this) {
            acc = cb(acc, this[i], i, this);
        }
    }

    return acc;
}

// 3.1 Reduce polyfill
Array.prototype.myReduce = function(cb, initialValue) {
    if (typeof cb !== 'function') throw new TypeError("Passed callback must be a function");

    const n = this.length;
    const hasInitialValue = arguments.length >= 2;
    if (!hasInitialValue && !n) throw new TypeError("Empty array can't have no initial value");

    let acc = initialValue;
    let start = 0;

    if (!hasInitialValue) {
        while (!(start in this) && start < n) start++;
        if (start === n) throw new TypeError("Empty array can't have no initial value");
        acc = this[start];
        start++;
    }

    for (let i = start; i < n; i++) {
        if (i in this) {
            acc = cb(acc, this[i], i, this);
        }
    }

    return acc;
}

// 4. ReduceRight polyfill
Array.prototype.myReduceRight = function(cb, initialValue) {
    if (typeof cb !== 'function') throw new TypeError("Passed callback must be a function");
    
    const n = this.length;
    const hasInitialValue = arguments.length >= 2;
    if (!hasInitialValue && !n) throw new TypeError("Empty array can't have no initial value");

    let acc = initialValue;
    let start = n - 1;

    if (!hasInitialValue) {
        while (!(start in this) && start >= 0) start--;
        if (start < 0) throw new TypeError("Empty array cant have no initial value");
        acc = this[start];
        start--;
    }

    for (let i = start; i >= 0; i--) {
        if (i in this) acc = cb(acc, this[i], i, this);
    }

    return acc;
}

// 5. Flat
Array.prototype.myFlat = function(depth = 1) {
  const result = [];
  const n = this.length;
  
  for (let i = 0; i < n; i++) {
    if (i in this) {
      const item = this[i];
      if (Array.isArray(item) && depth >= 1) result.push(...item.myFlat(depth - 1));
      else result.push(item);
    }
  }
  
  return result;
}

