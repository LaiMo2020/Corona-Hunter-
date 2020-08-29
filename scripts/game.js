// // creating the cols and rwos of the board

// const $board = $("#board");
// const ROWS = 10;
// const COLS = 10; 

// function createBoard(rows, cols) {
//   for (let i = 0; i < rows; i++) {
//     const $row = $("<div>").addClass("row");
//     for (let j = 0; j < cols; j++) {
//       const $col = $("<div>")
//       .addClass("col hidden") // adding hidding class
//       .attr(data-rows, i )
//       .attr("data-col", j)
      
//       if (Math.random() < 0.15){
//       $col.addClass("virus"); // adding the virus cell with 15% of the cell
//       }
//       $row.append($col);
//     }

//     $board.append($row);
//   }
// }
// createBoard(ROWS, COLS);

//     let icon = null;

// function restart() {
//   createBoard(ROWS, COLS);
// }

// function gameOver(isWin) {
//   let message = null;
//   let icon = null;
//   if (isWin) {
//     message = 'YOU WON!';
//     icon = 'fa fa-flag';
//   } else {
//     message = 'YOU LOST!';
//     icon = 'fa fa-bomb';
//   }
//   $('.col.mine').append(
//     $('<i>').addClass(icon)
//   );
//   $('.col:not(.mine)')
//     .html(function() {
//       const $cell = $(this);
//       const count = getMineCount(
//         $cell.data('row'),
//         $cell.data('col'),
//       );
//       return count === 0 ? '' : count;
//     })
//   $('.col.hidden').removeClass('hidden');
//   setTimeout(function() {
//     alert(message);
//     restart();
//   }, 1000);
// }
// function reveal(oi, oj) {
//   const seen = {};

//   function helper(i, j) {
//     if (i >= ROWS || j >= COLS || i < 0 || j < 0) return;
//     const key = `${i} ${j}`
//     if (seen[key]) return;
//     const $cell =
//       $(`.col.hidden[data-row=${i}][data-col=${j}]`);
//     const mineCount = getVirusCount(i, j);
//     if (
//       !$cell.hasClass('hidden') ||
//       $cell.hasClass('virus')
//     ) {
//       return;
//     }

//     $cell.removeClass('hidden');

//     if (mineCount) {
//       $cell.text(mineCount);
//       return;
//     }
    
//     for (let di = -1; di <= 1; di++) {
//       for (let dj = -1; dj <= 1; dj++) {
//         helper(i + di, j + dj);
//       }      
//     }
//   }

//   helper(oi, oj);
// }

// function getVirusCount(i, j) {
//   let count = 0;
//   for (let di = -1; di <= 1; di++) {
//     for (let dj = -1; dj <= 1; dj++) {
//       const ni = i + di;
//       const nj = j + dj;
//       if (ni >= ROWS || nj >= COLS || nj < 0 || ni < 0) continue;
//       const $cell =
//         $(`.col.hidden[data-row=${ni}][data-col=${nj}]`);
//       if ($cell.hasClass('mine')) count++;
//     }      
//   }
//   return count;
// }
// // adding a click listener
// $board.on('click', '.col.hidden', function() {
//   const $cell = $(this);
//   const row = $cell.data('row');
//   const col = $cell.data('col');
  
//   if ($cell.hasClass('virus')) {
//     gameOver(false);
//   } else {
//     reveal(row, col);
//     const isGameOver = $('.col.hidden').length === $('.col.virus').length
//     if (isGameOver) gameOver(true);
//   }
// })

// restart();


// creating the cols and rwos of the board

const $board = $("#board");
const ROWS = 10;
const COLS = 10;

function createBoard(rows, cols) {
  $board.empty();
  for (let i = 0; i < rows; i++) {
    const $row = $("<div>").addClass("row");
    for (let j = 0; j < cols; j++) {
      const $col = $("<div>")
        .addClass("col hidden") // adding hidding class
        .attr("data-row", i)
        .attr("data-col", j);
      if (Math.random() < 0.1) { // adding the virus cell with 10% of the cell
        $col.addClass("virus");
      }
      $row.append($col);
    }
    $board.append($row);
  }
}

function restart() {
  createBoard(ROWS, COLS);
}

function gameOver(isWin) {
  let message = null;
  let icon = null;
  if (isWin) {
    message = "YOU FOUND THE VIURSES!";
    icon = "fa fa-flag";
  } else {
    message = "YOU LOST!";
    icon = "fa fa-cog";
  }
  $(".col.virus").append(
    $("<i>").addClass(icon)
  );
  $(".col:not(.virus)")
    .html(function() {
      const $cell = $(this);
      const count = getVirusCount(
        $cell.data("row"),
        $cell.data("col"),
      );
      return count === 0 ? " " : count;
    })
  $('.col.hidden').removeClass("hidden");
  setTimeout(function() {
    alert(message);
    restart();
  }, 1000);
}

function reveal(oi, oj) {
  const seen = {};

  function helper(i, j) {
    if (i >= ROWS || j >= COLS || i < 0 || j < 0) return;
    const key = `${i} ${j}`
    if (seen[key]) return;
    const $cell =
      $(`.col.hidden[data-row=${i}][data-col=${j}]`);
    const virusCount = getVirusCount(i, j);
    if (
      !$cell.hasClass("hidden") ||
      $cell.hasClass("virus")
    ) {
      return;
    }

    $cell.removeClass("hidden");

    if (virusCount) {
      $cell.text(virusCount);
      return;
    }
    
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        helper(i + di, j + dj);
      }      
    }
  }

  helper(oi, oj);
}

function getVirusCount(i, j) {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= ROWS || nj >= COLS || nj < 0 || ni < 0) continue;
      const $cell =
        $(`.col.hidden[data-row=${ni}][data-col=${nj}]`);
      if ($cell.hasClass('virus')) count++;
    }      
  }
  return count;
}
// adding a click listener
$board.on("click", ".col.hidden", function() {
  const $cell = $(this);
  const row = $cell.data("row");
  const col = $cell.data("col");
  
  if ($cell.hasClass("virus")) {
    gameOver(false);
  } else {
    reveal(row, col);
    const isGameOver = $(".col.hidden").length === $('.col.virus').length
    if (isGameOver) gameOver(true);
  }
})

restart();