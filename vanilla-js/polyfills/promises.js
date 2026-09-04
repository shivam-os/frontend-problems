// 1. Promise.all() polyfill
Promise.customAll = function (promises) {
    const n = promises.length;
    let resolvedPromises = 0;
    const result = new Array(n).fill(0);

    return new Promise((resolve, reject) => {
        if (n === 0) {
            resolve([]);
            return;
        }
        
        for (let i = 0; i < n; i++) {
            Promise.resolve(promises[i])
                .then((data) => {
                    result[i] = data;
                    resolvedPromises++;
                    if (resolvedPromises === n) resolve(result);
                })
                .catch((err) => reject(err));
        }
    })
}

// 2. Promise.allSettled() polyfill
Promise.myAllSettled = function (promises) {
    const n = promises.length;
    const result = new Array(n);
    let settledPromises = 0;

    return new Promise((resolve) => {
        if (n === 0) {
            resolve([]);
            return;
        }

        for (let i = 0; i < n; i++) {
            Promise.resolve((promises[i]))
                .then((data) => result[i] = { status: 'fulfilled', value: data })
                .catch((err) => result[i] = { status: 'rejected', reason: err })
                .finally(() => {
                    settledPromises++;
                    if (settledPromises === n) resolve(result);
                });
        }
    })
}

// 3. Promise.race() polyfill
Promise.myRace = function (promises) {
    const n = promises.length;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < n; i++) {
            Promise.resolve(promises[i])
                .then(resolve)
                .catch(reject);
        }
    })
}


// 4. Promise.any() polyfill
Promise.myAny = function (promises) {
    const n = promises.length;
    const rejectedResult = new Array(n);
    let rejectedPromises = 0;

    return new Promise((resolve, reject) => {
        if (n === 0) {
            reject(new AggregateError([]));
            return;
        }
        
        for (let i = 0; i < n; i++) {
            Promise.resolve(promises[i])
                .then(resolve)
                .catch((err) => {
                    rejectedResult[i] = err;
                    rejectedPromises++;
                    if (rejectedPromises === n) reject(new AggregateError(rejectedResult));
                })
        }
    })
}