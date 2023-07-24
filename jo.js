"use strict";

((global) => {
  const timeout = 20;

  const _async = (fn, cb) => {
    setTimeout(() => {
      cb(fn());
    }, Math.random() * timeout);
  };

  const Folder = function (a = []) {
    if (!new.target) {
      return new Folder(a);
    }

    this.read = (index, cb) => _async(() => a[index], cb);
    this.size = (cb) => _async(() => a.length, cb);
  };

  Object.freeze(Folder);
  global.Folder = Folder;
})(typeof window === "undefined" ? global : window);

const input = Folder([
  "file",
  "ffffile",
  Folder(["file"]),
  Folder(["fiiile"]),
  Folder([{}, null, "file", "ffiillee", "ffiillee"]),
  Folder([Folder(["filllle", "file", null]), {}, Folder([])]),
]);

// проверка решения
solution(input).then((result) => {
  const answer = ["ffffile", "ffiillee", "ffiillee", "fiiile", "filllle"];
  const isEqual = String(answer) === String(result);

  if (isEqual) {
    console.log("OK");
  } else {
    console.log("WRONG");
  }
});

async function solution(input) {
  const isFolder = (f) =>
    !(typeof f === "string") &&
    !(f === null) &&
    !(f === undefined) &&
    "read" in f &&
    "size" in f;

  const traverse = (input, before) =>
    new Promise((resolve) => {
      const readFile = async (i) =>
        await new Promise((resolve) => input.read(i, (file) => resolve(file)));

      const getSize = new Promise((resolve) => {
        input.size((size) => resolve(size));
      });

      getSize.then(async (size) => {
        const result = [];
        for (let i = 0; i < size; i++) {
          await readFile(i).then(async (file) => {
            if (typeof file === "string") {
              if (new Set(file).size !== file.length) {
                result.push(file);
              }
            }
            if (isFolder(file)) {
              const l = await traverse(file, before);
              result.push(...l);
            }
          });
        }
        resolve([...before, ...result]);
      });
    });

  return traverse(input, []).then((r) => {
    r.sort();
    return r;
  });
}
