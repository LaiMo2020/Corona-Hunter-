// creating the cols and rwos 


const $board = $("#board");

function createBoard(rows, cols){
    for (let i = 0; i < rows; i++){
        const $row = $("<div>").addClass("row");
        for ( let j = 0; j < cols; j++ ) {
            const $col = $("<div>").addClass("col")
            $row.append($col);
        }

        $board.append($row);
    }
}
createBoard(10, 10);
