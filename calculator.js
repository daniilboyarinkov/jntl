const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;

rl.on("line", (line) => {
  n = Number(line.trim());
});

rl.on("close", () => {
  const dp = Array(n + 1).fill(0);

  for (let i = 2; i <= n; i++) {
    let v = dp[i - 1];

    if (i % 2 === 0) {
      v = Math.min(v, dp[Math.floor(i / 2)]);
    }
    if (i % 3 === 0) {
      v = Math.min(v, dp[Math.floor(i / 3)]);
    }
    dp[i] = v + 1;
  }

  let way = " " + n;

  let i = n;
  while (i > 1) {
    if (dp[i] === dp[i - 1] + 1) {
      i--;
      way = " " + i + way;
      continue;
    }
    if (i % 2 === 0 && dp[i] === dp[Math.floor(i / 2)] + 1) {
      i /= 2;
      way = " " + i + way;
      continue;
    }
    i /= 3;
    way = " " + i + way;
  }

  console.log(dp.at(-1));
  console.log(way.trim());
});
