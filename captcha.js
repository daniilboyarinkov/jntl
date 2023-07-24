function solveCaptcha(captcha) {
  const lines = captcha.trim().split("\n");
  const grid = lines.map((line) => line.trim().split(""));

  function sliceToString(slice) {
    const nsl = slice.map((row) => row.join(""));
    return nsl.join("\n");
  }

  function testValidSlice(grid, x, y, width, height) {
    const slice = [];
    if (x + width > grid[0].length) {
      return false;
    }
    if (y + height > grid.length) {
      return false;
    }
    for (let i = y; i < y + height; i++) {
      slice.push(grid[i].slice(x, x + width));
    }
    let signCount = 0;
    for (const row of slice) {
      signCount += row.filter((cell) => cell === "S").length;
    }
    return signCount === 1 ? slice : false;
  }

  function doCut(grid, x, y, width, height) {
    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        grid[i][j] = "x";
      }
    }
  }

  function findFirstTopLeftCorner(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] !== "x") {
          return [i, j];
        }
      }
    }
  }

  function run(grid, size, slices, loop) {
    const corner = findFirstTopLeftCorner(grid);
    if (!corner) {
      return slices;
    }
    const x = corner[1];
    const y = corner[0];
    for (let width = size; width >= 1; width--) {
      for (let height = 1; height <= size; height++) {
        if (width * height !== size) {
          continue;
        }
        const slice = testValidSlice(grid, x, y, width, height);
        if (!slice) {
          continue;
        }
        const newSlices = slices.slice();
        const newGrid = grid.map((row) => [...row]);
        newSlices.push(sliceToString(slice));
        doCut(newGrid, x, y, width, height);
        const result = run(newGrid, size, newSlices, loop + 1);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  const signCount = grid.reduce((count, row) => {
    return count + row.filter((cell) => cell === "S").length;
  }, 0);

  const sliceSize = (grid.length * grid[0].length) / signCount;

  const output = run(grid, sliceSize, [], 1);
  if (output === null) {
    return [];
  } else {
    return output;
  }
}

console.log(
  solveCaptcha(`
  TRABWARH
  THSCAHAW
  WWBSCWAA
  CACACHCR
`)
);
