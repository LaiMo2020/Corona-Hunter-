// creating the cols and rwos of the board and declare them

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
      if (Math.random() < 0.1) {
        // adding the virus cell with 10% of the cell
        $col.addClass("virus");
      }
      $row.append($col);
    }
    $board.append($row);
  }
}

// restart the game after losing or winning
function restart() {
  createBoard(ROWS, COLS);
}

function gameOver(isWin) {
  let message = null;
  let icon = null;
  if (isWin) {
    // message = "YOU FOUND THE VIURSES!"; if no virus cell's is clicked
    icon = "fa fa-flag";
  } else {
    message = "THE VIRUS GOT YOU!"; //  if the virus cell was clicked
    icon = "fa fa-cog";
  }
  $(".col.virus").append($("<i>").addClass(icon));
  $(".col:not(.virus)").html(function () {
    const $cell = $(this);
    const count = getVirusCount($cell.data("row"), $cell.data("col"));
     return count === 0 ? " " : count; // hiding the number od the cell has no viruses after the game over 
  });
  $(".col.hidden").removeClass("hidden");
  setTimeout(function () {
    alert(message);
    restart();
  }, 1000);
}
//  tracking where are recrusions is going  / json locations/
function reveal(oi, oj) {
  const seen = {};

  function helper(i, j) {
    if (i >= ROWS || j >= COLS || i < 0 || j < 0) return;
    const key = `${i} ${j}`;
    if (seen[key]) return;
    const $cell = $(`.col.hidden[data-row=${i}][data-col=${j}]`);
    const virusCount = getVirusCount(i, j);
    if (!$cell.hasClass("hidden") || $cell.hasClass("virus")) {
      return;
    }

    $cell.removeClass("hidden"); // empty opened cell

    // stop it to be reversing further after clicking on cell that has a number on it
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
// numbers of viruses around the clicked cell 
function getVirusCount(i, j) {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= ROWS || nj >= COLS || nj < 0 || ni < 0) continue;
      const $cell = $(`.col.hidden[data-row=${ni}][data-col=${nj}]`);
      if ($cell.hasClass("virus")) count++;
    }
  }
  return count;
}
// adding a click listener
$board.on("click", ".col.hidden", function () {
  const $cell = $(this);
  const row = $cell.data("row");
  const col = $cell.data("col");
  //   if the a cell with a virus is clicked
  if ($cell.hasClass("virus")) {
    gameOver(false);
  } else {
    reveal(row, col);
    const isGameOver = $(".col.hidden").length === $(".col.virus").length;
    if (isGameOver) gameOver(true);
  }
});

restart();
