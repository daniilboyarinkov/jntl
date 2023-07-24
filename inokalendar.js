/** @returns string */
function solution(inputString) {
  const date = inputString.match(/ta['’](?<data>(so|ko|ta|qa|goo) \d+)/i);
  console.log(date);
  if (!date) return "0";
  return date.groups.data.toLowerCase();
}

console.log(
  solution("DUN 'Ej QAD Je pAtLh TLhOQ Ta'tA 494 PuS WoVBe' SICh HuD,")
);
console.log(solution(" ta'so 29"));
console.log(solution(" Ta’gh ta’So 29 jE yin"));
