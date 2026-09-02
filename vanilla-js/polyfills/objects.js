/*
1. Deep flatten an object with dot notation
Ex: Input:
{
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
       L: 56
    },
    Q: [1, 2]
   }   
}

Output:
{
  "A": "12"
  "B": 23,
  "C.O.L": 56,
  "C.P": 23,
  "C.Q.0": 1,
  "C.Q.1": 2,
}
*/
const deepFlatten = (obj, prefix = "") => {
  let result = {};
  
  for (let key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object') {
      result = {...result, ...flatten(value, newKey)};
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}

// 2. Deep copy of a nested object (Simplified structuredClone polyfill)
const deepCopyV1 = (obj) => {
    if (typeof obj === null || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
        const result = [];
        for (let item of obj) {
            result.push(deepCopyV1(item));
        }
        return result;
    }

    const result = {};
    for (let key in obj) {
        result[key] = deepCopyV1(obj[key]);
    }
    return result;
}

const deepCopyV2 = (obj) => {
    if (typeof obj === null || typeof obj !== "object") return obj;

    const result = Array.isArray(obj) ? [] : {};
    for (let key of Object.keys(obj)) {
        result[key] = deepCopyV2(obj[key]);
    }
    return result;
}