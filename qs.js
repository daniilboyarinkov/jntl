function result(N, staff, K) {
  if (K === 0) {
    return 0;
  }
  const arr = qs(staff, 0, N - 1, K);
  return arr.reduce((a, c) => a + c, 0);
}

function qs(arr, l, r, k) {
  const pivot = partition(arr, l, r);

  if (pivot === k - 1) {
    return arr.slice(0, arr.indexOf(arr[pivot]) + 1);
  }
  if (pivot > k - 1) {
    return qs(arr, l, pivot - 1, k);
  } else {
    return qs(arr, pivot + 1, r, k);
  }
}

function partition(arr, l, r) {
  const pivot = arr[r];

  let i = l;
  for (let j = l; j < r; j++) {
    if (arr[j] >= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[r]] = [arr[r], arr[i]];
  return i;
}

console.log(result(8, [5, 13, 8, 4, 4, 15, 1, 9], 8));
console.log(result(11, [14, 8, 15, 19, 2, 21, 13, 21, 12, 10, 8], 5));
console.log(result(15, [19, 20, 5, 10, 2, 20, 7, 9, 1, 3, 13, 14, 3, 3, 4], 1));
console.log(result(12, [22, 7, 24, 24, 11, 22, 24, 3, 9, 16, 2, 19], 7));
console.log(result(7, [10, 3, 21, 23, 6, 3, 8], 4));
console.log(result(7, [10, 3, 21, 23, 6, 3, 8], 0));
