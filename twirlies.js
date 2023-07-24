// const solution = (str) => /\b(1111|711|7)+?\b/g.test(str);

console.log(solution("7"));
console.log(solution("77"));
console.log(solution("71"));
console.log(solution("17"));
console.log(solution("711"));
console.log(solution("71111"));

function solution(str) {
  if (!str.length) {
    return false;
  }
  let seven = false;
  let counter = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== "7" && str[i] !== "1") {
      return false;
    }

    if (!seven) {
      if (str[i] === "7") {
        if (counter % 4 !== 0) {
          return false;
        }
        seven = true;
      } else {
        counter++;
      }
    } else {
      if (str[i] === "7") {
        seven = true;
        if (!(counter % 4 === 0 || (counter - 2) % 4 === 0)) {
          return false;
        }
      } else {
        counter++;
      }
    }
  }
  if (!seven) {
    return counter % 4 === 0;
  } else {
    if (counter === 0) return true;
    return counter % 4 === 0 || (counter - 2) % 4 === 0;
  }
}
