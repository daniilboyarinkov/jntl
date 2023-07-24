const { getLastCompatibleDependencies } = require("./index");

const test1 = {
  data: {
    "lite-components": {
      versions: [
        {
          version: 17,
          dependencies: [{ packageName: "pretty-colors", version: 198 }],
        },
        {
          version: 16,
          dependencies: [{ packageName: "pretty-colors", version: 198 }],
        },
        {
          version: 15,
          dependencies: [{ packageName: "pretty-colors", version: 197 }],
        },
        {
          version: 14,
          dependencies: [{ packageName: "pretty-colors", version: 196 }],
        },
        {
          version: 13,
          dependencies: [{ packageName: "pretty-colors", version: 196 }],
        },
        {
          version: 12,
          dependencies: [{ packageName: "pretty-colors", version: 196 }],
        },
      ],
    },
    "lite-design": {
      versions: [
        {
          version: 5,
          dependencies: [{ packageName: "css-helper", version: 41 }],
        },
        {
          version: 4,
          dependencies: [{ packageName: "css-helper", version: 39 }],
        },
        {
          version: 3,
          dependencies: [{ packageName: "css-helper", version: 39 }],
        },
        {
          version: 2,
          dependencies: [{ packageName: "css-helper", version: 36 }],
        },
        {
          version: 1,
          dependencies: [{ packageName: "css-helper", version: 33 }],
        },
      ],
    },
    "pretty-colors": {
      versions: [
        {
          version: 198,
          dependencies: [{ packageName: "css-helper", version: 40 }],
        },
        {
          version: 197,
          dependencies: [{ packageName: "css-helper", version: 38 }],
        },
        {
          version: 196,
          dependencies: [{ packageName: "css-helper", version: 36 }],
        },
        {
          version: 195,
          dependencies: [{ packageName: "css-helper", version: 36 }],
        },
        {
          version: 194,
          dependencies: [{ packageName: "css-helper", version: 35 }],
        },
      ],
    },
    "css-helper": {
      versions: [
        { version: 41 },
        { version: 40 },
        { version: 39 },
        { version: 38 },
        { version: 37 },
        { version: 36 },
        { version: 35 },
        { version: 34 },
        { version: 33 },
      ],
    },
  },
  packageA: "lite-components",
  packageB: "lite-design",
};

const test2 = {
  data: {
    react: { versions: [{ version: 18 }, { version: 17 }, { version: 16 }] },
    router: {
      versions: [
        { version: 21, dependencies: [{ packageName: "react", version: 18 }] },
        { version: 20, dependencies: [{ packageName: "react", version: 18 }] },
        { version: 19, dependencies: [{ packageName: "react", version: 17 }] },
        { version: 18, dependencies: [{ packageName: "react", version: 17 }] },
        { version: 17, dependencies: [{ packageName: "react", version: 16 }] },
      ],
    },
    uikit: {
      versions: [
        {
          version: 9,
          dependencies: [
            { packageName: "router", version: 20 },
            { packageName: "react", version: 17 },
          ],
        },
        {
          version: 8,
          dependencies: [
            { packageName: "router", version: 19 },
            { packageName: "react", version: 17 },
          ],
        },
        {
          version: 7,
          dependencies: [
            { packageName: "router", version: 18 },
            { packageName: "react", version: 17 },
          ],
        },
      ],
    },
  },
  packageA: "router",
  packageB: "uikit",
};

const expected1 = { result: { "lite-components": 14, "lite-design": 2 } };
const expected2 = { result: { router: 19, uikit: 8 } };

const result1 = getLastCompatibleDependencies(
  test1.data,
  test1.packageA,
  test1.packageB
);
const result2 = getLastCompatibleDependencies(
  test2.data,
  test2.packageA,
  test2.packageB
);

console.log(result1 === expected1.result || result1);
console.log(result2 === expected2.result || result2);
