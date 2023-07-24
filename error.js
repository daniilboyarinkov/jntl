function solution({ participants, sports }) {
  const result = [];
  /**
   * both arrays are of same length
   */
  const len = participants.length;

  for (let i = 0; i < len; i++) {
    result.push([sports[len - i - 1], participants[i]]);
  }

  return result.reverse();
}

console.log(
  solution({
    participants: ["Mary", "Kate"],
    sports: ["football", "hockey"],
  })
);
