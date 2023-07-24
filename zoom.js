// /**
//  * @param n - количество участников
//  * @param width - ширина экрана каждого участника в пикселях
//  * @param height - высота экрана каждого участника в пикселях
//  */
// function solution(n, width, height) {
//   const columns = Math.ceil(Math.sqrt(n));
//   const rows = Math.ceil(n / columns);
//   const widthCell = Math.round(width / columns);
//   const heightCell = Math.round(height / columns);
//   const remainder = n % columns;

//   const result = [];

//   for (let i = 0; i < n; i++)
//     result.push({ width: widthCell, height: heightCell });

//   if (remainder > 0)
//     for (let i = 0; i < remainder; i++) {
//       result[i].x = Math.round(
//         (width - remainder * widthCell) / 2 + i * widthCell
//       );
//       result[i].y = Math.round((height - rows * (height / columns)) / 2);
//       result[i].width = widthCell;
//       result[i].height = heightCell;
//     }

//   for (let i = remainder; i < n; i++) {
//     result[i].x = Math.round(((i - remainder) % columns) * widthCell);
//     result[i].y = Math.round(
//       (height - rows * (height / columns)) / 2 +
//         Math.ceil((i - remainder + 1) / rows - Number(!remainder)) *
//           (height / columns)
//     );

//     result[i].width = widthCell;
//     result[i].height = heightCell;
//   }
//   return result;
// }

// console.log(solution(1, 100, 100));
// console.log(solution(2, 1200, 900));
// // [
// //     {
// //         "x": 0,
// //         "y": 225,
// //         "width": 600,
// //         "height": 450
// //     },
// //     {
// //         "x": 600,
// //         "y": 225,
// //         "width": 600,
// //         "height": 450
// //     }
// // ]
// console.log(solution(3, 1200, 900));

// // [
// //     {
// //         "x": 300,
// //         "y": 0,
// //         "width": 600,
// //         "height": 450
// //     },
// //     {
// //         "x": 0,
// //         "y": 450,
// //         "width": 600,
// //         "height": 450
// //     },
// //     {
// //         "x": 600,
// //         "y": 450,
// //         "width": 600,
// //         "height": 450
// //     }
// // ]

// function solution(n, width, height) {
//   const result = [];
//   const columnsNumber = Math.ceil(Math.sqrt(n));
//   const rowsNumber = Math.ceil(n / columnsNumber);
//   const videoWidth = Math.round(width / columnsNumber);
//   const videoHeight = Math.round(height / columnsNumber);
//   const verticalMargin = (height - videoHeight * rowsNumber) / 2;
//   const firstRowColumnsNumber =
//     n % columnsNumber !== 0 ? n % columnsNumber : columnsNumber;
//   let horizontalMargin = 0;

//   for (let i = 0; i < rowsNumber; i++) {
//     if (i + 1 === 1 && firstRowColumnsNumber !== 0) {
//       horizontalMargin = (width - firstRowColumnsNumber * videoWidth) / 2;
//     } else {
//       horizontalMargin = 0;
//     }

//     for (let j = 0; j < columnsNumber; j++) {
//       if (
//         i === 0 &&
//         j >= firstRowColumnsNumber &&
//         firstRowColumnsNumber !== columnsNumber
//       ) {
//         continue;
//       }

//       let x = j * videoWidth;
//       let y = i * videoHeight;

//       if (verticalMargin > 0) {
//         y += verticalMargin;
//       }

//       if (horizontalMargin > 0 && i + 1 === 1) {
//         x += horizontalMargin;
//       }

//       result.push({
//         width: videoWidth,
//         height: videoHeight,
//         x,
//         y,
//       });
//     }
//   }

//   return result;
// }

// function solution(n, width, height) {
//   const column = Math.ceil(Math.sqrt(n));
//   const widthOfPhoto = width / column;
//   const heightOfPhoto = height / n;
//   const centerOfPhoto = widthOfPhoto / 2;
//   const rows = n / column;
//   const arr = [];
//   const xCorOneRow = [];
//   const yCorRows = [];
//   const firstRowIsTypical = n % column;

//   for (let i = 0; i < n; i++) {
//     arr.push({
//       width: Math.round(widthOfPhoto),
//       height: Math.round(heightOfPhoto),
//       x: null,
//       y: null,
//     });
//   }

//   for (let i = 0; i < column; i++) {
//     let xCor = Math.round(widthOfPhoto * i + centerOfPhoto);
//     xCorOneRow.push(xCor);
//   }
//   const xCorArr = [];
//   for (let i = 0; i < column; i++) {
//     xCorArr.push(...xCorOneRow);
//   }

//   let counterX = 0;

//   for (let index = 0 + firstRowIsTypical; index < arr.length; index++) {
//     arr[index].x = xCorArr[counterX];
//     counterX++;
//   }

//   for (let i = 0; i < rows; i++) {
//     let yCor = Math.round(heightOfPhoto * i + heightOfPhoto);
//     for (let j = 0; j < column; j++) {
//       yCorRows.push(yCor);
//     }
//   }
//   let counterY = 0;
//   for (let index = 0 + firstRowIsTypical; index < arr.length; index++) {
//     arr[index].y = yCorRows[counterY];
//     counterY++;
//   }
//   if (firstRowIsTypical) {
//     let offsetOfFirstRow = (widthOfPhoto * (column - firstRowIsTypical)) / 2;
//     for (let i = 0; i < column; i++) {
//       arr[i].x = Math.round(
//         offsetOfFirstRow + (widthOfPhoto * i + widthOfPhoto / 2)
//       );
//       arr[i].y = 0;
//     }
//   }
//   return arr;
// }

function solution(n, width, height) {
  const k = width / height;
  let videos = [];
  let rows = 0;
  let offsetY = 0;
  let offsetX = 0;

  let columns = Math.ceil(Math.sqrt(n));
  const blockWidth = width / columns;
  const blockHeight = blockWidth / k;

  if (n <= Math.pow(columns, 2) - columns) {
    rows = columns - 1;
    offsetY = blockHeight / 2;
  } else {
    rows = columns;
  }

  let position = {
    x: null,
    y: height - offsetY,
  };

  let fillRow = (counter, offset) => {
    position.x = width - offset;
    position.y = Math.round(position.y - blockHeight);
    for (let i = counter; i > 0; i--) {
      position.x = Math.round(position.x - blockWidth);
      if (position.y < 0) {
        position.y = 0;
      }
      if (position.x < 0) {
        position.x = 0;
      }
      videos.unshift({
        width: Math.round(blockWidth),
        height: Math.round(blockHeight),
        x: position.x,
        y: position.y,
      });
    }
  };

  while (rows !== 1) {
    fillRow(columns, offsetX);
    rows--;
  }

  let restBlocks = n % columns;
  if (restBlocks != 0) {
    offsetX = (width - restBlocks * blockWidth) / 2;
    fillRow(restBlocks, offsetX);
  } else {
    fillRow(columns, offsetX);
  }

  return videos;
}

console.log(solution(1, 1200, 900));
console.log(solution(2, 1200, 900));
console.log(solution(3, 1200, 900));
// console.log(solution(4, 1200, 800));
// console.log(solution(5, 1200, 800));
// console.log(solution(6, 1200, 800));
// console.log(solution(7, 1200, 800));
// console.log(solution(8, 1200, 800));
// console.log(solution(9, 1200, 800));
