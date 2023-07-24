function sumExcept(arr, exceptStart, exceptCount = 1) {
  return arr.reduce((acc, cur, index) => {
    if (!Number.isInteger(cur)) {
      return acc;
    }

    if (index >= exceptStart && index < exceptStart + exceptCount) {
      return acc;
    }

    return acc + cur;
  }, 0);
}

console.log(sumExcept([1, 9, 8, 4], 1, 2));
