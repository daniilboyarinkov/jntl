/**
 * @param {string} genA
 * @param {string} genB
 * @param {number} level
 * @returns {boolean}
 */
function isRelativies(genA, genB, level) {
  if (level === 0) {
    return genA === genB;
  }

  const maxl = Math.max(genA.length, genB.length);

  if (level === 1 && maxl === 1) {
    return false;
  }

  const lcs = longestCommonSubstring(genA, genB);

  if (lcs.length === 0) {
    return false;
  }

  const result = maxl - lcs.length <= level;

  return result;
}

function longestCommonSubstring(str1, str2) {
  let maxLength = 0;
  let endIndex = 0;

  const suffixMatrix = Array(str1.length + 1)
    .fill(null)
    .map(() => Array(str2.length + 1).fill(0));

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        suffixMatrix[i][j] = suffixMatrix[i - 1][j - 1] + 1;
        if (suffixMatrix[i][j] > maxLength) {
          maxLength = suffixMatrix[i][j];
          endIndex = i - 1;
        }
      } else {
        suffixMatrix[i][j] = 0;
      }
    }
  }

  const longestSubstring = str1.substring(
    endIndex - maxLength + 1,
    endIndex + 1
  );
  return longestSubstring;
}

console.log(isRelativies("AGCT", "C", 4)); // false)
// console.log(isRelativies("AT", "TA", 0)); // false)
// console.log(isRelativies("AT", "TA", 1)); // true)
// console.log(isRelativies("AT", "TA", 5)); // true)

// console.log(isRelativies("ATGGC", "TG", 3)); // true)
// console.log(isRelativies("ATGGC", "TG", 2)); // false)
// console.log(isRelativies("ATGGC", "TG", 10)); // true)

// console.log(isRelativies("AAA", "AAA", 0)); // true)
// console.log(isRelativies("AAA", "AAA", 5)); // true)
// console.log(isRelativies("AAA", "AAA", 55)); // true)

// console.log(isRelativies("ATTTGCGC", "CGCGATTT", 4)); // true)
// console.log(isRelativies("ATTTGCGC", "CGCGATTT", 2)); // false)
// console.log(isRelativies("G", "T", 1)); // false)
