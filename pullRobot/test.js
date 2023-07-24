const mergeAllPRs = require("./pullRobot");

const test1 = mergeAllPRs([
  {
    id: "#1",
    created: 1536077100,
    files: [".gitignore", "README.md"],
  },
  {
    id: "#2",
    created: 1536077700,
    files: ["index.js", "package-lock.json", "package.json"],
  },
  {
    id: "#3",
    created: 1536077800,
    files: [".pnp.js", "yarn.lock"],
  },
]);
const test2 = mergeAllPRs([
  {
    id: "#1",
    created: 1536074100,
    files: ["README.md"],
  },
  {
    id: "#2",
    created: 1536078700,
    files: ["README.md"],
  },
  {
    id: "#3",
    created: 1536097800,
    files: ["README.md", "README1.md"],
  },
]);
const test3 = mergeAllPRs([
  {
    id: "#3",
    created: 1536097800,
    files: ["README.md", "README1.md"],
  },
  {
    id: "#1",
    created: 1536074100,
    files: ["README.md", "README1.md"],
  },
  {
    id: "#2",
    created: 1536078700,
    files: ["README.md", "README1.md"],
  },
  {
    id: "#4",
    created: 1536078000,
    files: ["README.md"],
  },
]);
const test4 = mergeAllPRs([
  {
    id: "#3",
    created: 1536097800,
    files: ["README.md", "README1.md"],
  },
  {
    id: "#2",
    created: 1536078700,
    files: ["README1.md"],
  },
  {
    id: "#1",
    created: 1536074100,
    files: ["README.md"],
  },
]);
const test5 = mergeAllPRs([
  {
    id: "#1",
    created: 1536077100,
    files: [".gitignore", "README.md"],
  },
  {
    id: "#3",
    created: 1536077800,
    files: [".pnp.js", "package-lock.json", "yarn.lock"],
  },
  {
    id: "#2",
    created: 1536077700,
    files: ["index.js", "package-lock.json", "package.json"],
  },
  {
    id: "#4",
    created: 1536077900,
    files: ["index.spec.js", "index.spec.ts", "index.ts"],
  },
]);
const test6 = mergeAllPRs([
  {
    id: "#1",
    created: 1536077100,
    files: [".gitignore", "README.md"],
  },
  {
    id: "#2",
    created: 1536077700,
    files: ["index.js", "package-lock.json", "package.json"],
  },
  {
    id: "#3",
    created: 1536077800,
    files: ["index.js"],
  },
]);
const test7 = mergeAllPRs([
  {
    id: "#1",
    created: 1536077100,
    files: ["index.js"],
  },
  {
    id: "#3",
    created: 1536077800,
    files: [".gitignore", "README.md"],
  },
  {
    id: "#2",
    created: 1536077700,
    files: ["index.js", "package-lock.json", "package.json"],
  },
]);

const expected1 = ["#1", "#2", "#3"];
const expected2 = ["#3"];
const expected3 = ["#1"];
const expected4 = ["#1", "#2"];
const expected5 = ["#1", "#2", "#4"];
const expected6 = ["#1", "#2"];
const expected7 = ["#2", "#3"];

console.log(test1.join(",") === expected1.join(",") || test1);
console.log(test2.join(",") === expected2.join(",") || test2);
console.log(test3.join(",") === expected3.join(",") || test3);
console.log(test4.join(",") === expected4.join(",") || test4);
console.log(test5.join(",") === expected5.join(",") || test5);
console.log(test6.join(",") === expected6.join(",") || test6);
console.log(test7.join(",") === expected7.join(",") || test6);
// console.log(mergeAllPRs([]));

// node ./pullRobot/test
