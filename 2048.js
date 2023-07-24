const field = [
  [0, 2, 4, 8],
  [0, 0, 0, 0],
  [0, 2, 2, 8],
  [0, 2, 2, 2],
];

const moves = "U D L R";

const filterZeros = (arr) => arr.filter((x) => x !== 0);

function slide(row, columnsCount) {
  row = filterZeros(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }

  row = filterZeros(row);

  while (row.length < columnsCount) {
    row.push(0);
  }

  return row;
}

const slideUp = (field) => {
  for (let c = 0; c < field[0]?.length; c++) {
    let row = [];

    for (let r = 0; r < field.length; r++) {
      row.push(field[r][c]);
    }

    row = slide(row, field[0]?.length);

    for (let r = 0; r < field.length; r++) {
      field[r][c] = row[r];
    }
  }

  return field;
};

const slideDown = (field) => {
  for (let c = 0; c < field[0]?.length; c++) {
    let row = [];

    for (let r = 0; r < field.length; r++) {
      row.push(field[r][c]);
    }

    row.reverse();
    row = slide(row, field[0]?.length);
    row.reverse();

    for (let r = 0; r < field.length; r++) {
      field[r][c] = row[r];
    }
  }

  return field;
};

const slideRight = (field) => {
  for (let r = 0; r < field.length; r++) {
    let row = field[r];
    row.reverse();
    row = slide(row, field[0]?.length);
    row.reverse();
    field[r] = row;
  }

  return field;
};

const slideLeft = (field) => {
  for (let r = 0; r < field.length; r++) {
    let row = field[r];
    row = slide(row, field[0]?.length);
    field[r] = row;
  }

  return field;
};

const slideMoves = {
  U: slideUp,
  D: slideDown,
  R: slideRight,
  L: slideLeft,
};

function solution(field, moves) {
  const result = moves
    .trim()
    .split(" ")
    .reduce((acc, move) => slideMoves[move]?.(acc), field);

  return result;
}

console.log(solution(field, moves));
