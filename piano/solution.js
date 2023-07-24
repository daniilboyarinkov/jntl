const keys = document.querySelectorAll(".key");

const seq = [7, 7, 7, 3, 10, 7, 3, 10, 7, 14, 14, 14, 15, 10, 6, 3, 10, 7];

for (let i = 0; i < seq.length; i++) {
  const key = seq[i];

  setTimeout(() => {
    keys[key].click();
  }, 100 * i);
}
