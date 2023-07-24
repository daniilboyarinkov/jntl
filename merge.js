function merge(nums1, m, nums2, n) {
  let l = m - 1;
  let r = n - 1;
  let p = m + n - 1;

  while (p >= 0) {
    if (l >= 0 && nums1[l] > nums2[r]) {
      nums1[p--] = nums1[l--];
    } else {
      nums1[p--] = nums2[r--];
    }
  }
}

console.log(merge([46, 55, 88, 0, 0, 0, 0], 3, [18, 29, 80, 90], 4));
