/**
 *
 * @typedef Replace
 *
 * @property {string} from
 * @property {string} to
 */

/**
 *
 * @param {string} message
 * @param {Replace[]} replaces
 * @returns {string}
 */

function decode(message, replaces) {
  let left = 0;
  let decodedText = "";
  let current = "";

  function findAvailableReplaces(string) {
    return replaces
      .filter((replace) => {
        const reg = new RegExp(replace.from);
        return reg.test(string);
      })
      .sort((a, b) => {
        const regA = new RegExp(a.from);
        const regB = new RegExp(b.from);
        return string.match(regB).index - string.match(regA).index;
      });
  }

  while (left < message.length) {
    current = message.slice(left);
    const availableReplaces = findAvailableReplaces(current);

    if (!availableReplaces.length) {
      decodedText += current;
      current = "";
      break;
    }

    const replace = availableReplaces.pop();
    const shift = current.indexOf(replace.from) + replace.from.length;
    left = left + shift;
    current = current.slice(0, shift);
    decodedText += current.replace(replace.from, replace.to);
    current = "";
  }

  return decodedText;
}

console.log(decode("Aa", [{ from: "a", to: "b" }])); // Aa
console.log(decode("ab", [{ from: "a", to: "b" }])); // bb
console.log(
  decode("ab", [
    { from: "a", to: "ba" },
    { from: "b", to: "r" },
  ])
); // bar
console.log(
  decode("ab", [
    { from: "b", to: "bar" },
    { from: "ab", to: "foo" },
  ])
); // foo

console.log(
  decode("ab", [
    { from: "a", to: "bar" },
    { from: "ab", to: "foo" },
  ])
); // foo
