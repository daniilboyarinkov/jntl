function calcDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function isLetter(cell) {
  return /[A-Z]/.test(cell);
}

function isHole(cell) {
  return /[0-9]/.test(cell);
}

function number(soup) {
  soup = soup
    .trim()
    .split("\n")
    .map((s) => s.trim());

  const WIDTH = soup[0].length;
  const HEIGHT = soup.length;

  const holes = [];

  // собираем дырки с верхнего и нижнего ряда
  for (let i = 0; i < WIDTH; i++) {
    const top = soup[0][i];
    const bottom = soup[HEIGHT - 1][i];

    if (isHole(top)) {
      holes.push({
        x: i,
        y: 0,
      });
    }

    if (isHole(bottom)) {
      holes.push({
        x: i,
        y: HEIGHT - 1,
      });
    }
  }

  // собираем дырки с левого и правого ряда
  for (let i = 1; i < HEIGHT - 1; i++) {
    const left = soup[i][0];
    const right = soup[i][WIDTH - 1];

    if (isHole(left)) {
      holes.push({
        x: 0,
        y: i,
      });
    }
    if (isHole(right)) {
      holes.push({
        x: WIDTH - 1,
        y: i,
      });
    }
  }

  const letters = [];

  // проходим по "внутренностям" и высчитываем минимальное расстояние до какой либо дырки
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const cell = soup[i][j];

      if (isLetter(cell)) {
        let minDistance = Infinity;

        for (const hole of holes) {
          const distance = calcDistance(hole.x, hole.y, j, i);
          if (distance < minDistance) minDistance = distance;
        }

        letters.push(minDistance);
      }
    }
  }

  if (!letters.length) {
    return 1;
  }

  let m = 0;

  for (const mm of letters) {
    if (mm > m) {
      m = mm;
    }
  }

  return m + 1;
}
// ----------------------------------------------------------------

console.log(
  number(`+----------------0---------------+
|                                |
|                                |
|          Y        D            |
|     A                          |
|              E                 |
|           N                    |
|  Y                             1
3        Y    D                  |
|         A              X       |
|                                |
+----------------2---------------+`)
);

console.log(
  number(`+----------------0---------------+
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                1
3                                |
|                                |
|                                |
+----------------2---------------+`)
);

// console.log(
//   number(`607
// 1A2
// 435`)
// );

console.log(
  number(`
A-+
| |
+-0
  `)
);
