function createCountdown(count) {
  return function () {
    if (!Number.isInteger(count)) {
      return 0;
    }

    return count > 0 ? count-- : 0;
  };
}

const countdownFrom2 = createCountdown(1.2);

console.log(countdownFrom2()); // 2
console.log(countdownFrom2()); // 1
console.log(countdownFrom2()); // 0
console.log(countdownFrom2()); // 0
console.log(countdownFrom2()); // 0
console.log(countdownFrom2()); // 0
