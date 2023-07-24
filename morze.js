function decodeMorse(str) {
  const ref = {
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
  };
  return str
    .split("   ")
    .map((a) =>
      a
        .split(" ")
        .map((b) => ref[b])
        .join("")
    )
    .join(" ");
}

function normalize(str) {
  return str
    .replace(/T[.-]{5}/g, (m) => m.split("").slice(1).reverse().join(""))
    .replace(/R[.-]{10}/g, (m) => {
      let origin = "";
      for (let i = 1; i < m.length; i++) {
        if (i % 2 !== 0) origin += m[i];
      }
      return origin;
    });
}

function solution(str) {
  const normalizedStr = normalize(str);
  console.log(normalizedStr);

  return decodeMorse(normalizedStr);
}

console.log(
  solution(
    "T..... T---.. -.... .----   .---- R........-- T..... T.----   R.......... .---- T..... ---..   .---- R----...... R----...... ...--"
  )
);
