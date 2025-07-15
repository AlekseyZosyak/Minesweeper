
const createField = (rows, cols, mines) => {
    const field = [];

    for (let row = 0; row < rows; row++) {
        const currentRow = [];

        for (let col = 0; col < cols; col++) {
            currentRow.push({
                isMine: false,
                isRevealed: false,
                minesAround: 0,
                row: row,
                col: col,
            });
        }
        field.push(currentRow);
    }

    minesGenerator(field, rows, cols, mines);

    return { field: field, rows: rows, cols: cols };
};


const minesGenerator = (field, rows, cols, mines) => {
    let minesPleced = 0;

    while (minesPleced < mines) {
        const a = Math.floor(Math.random() * rows);
        const b = Math.floor(Math.random() * cols);

        if (!field[a][b].isMine) {
            field[a][b].isMine = true;
            minesPleced++;
        }
    }
};


const startGame = createField(5, 5, 5);
console.log(startGame.field);


const oneClick = (func) => {
    const { field, rows, cols } = func;

    const a = Math.floor(Math.random() * rows);
    const b = Math.floor(Math.random() * cols);
    console.log(a);
    console.log(b);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (field[row][col].isMine) continue;

            let minesAround = 0;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;

                    const newRow = row + dr;
                    const newCol = col + dc;

                    if ( newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && field[newRow][newCol].isMine) {
                        minesAround++;
                    }
                }
            }
            field[row][col].minesAround = minesAround;
        }
    }

    field[a][b].isRevealed = true;

    if (field[a][b].minesAround === 0 && !field[a][b].isMine) {
        revealZeros(a, b, field, rows, cols);
    }

};

oneClick(startGame);
board(startGame.field);



function revealZeros(row, col, field, rows, cols, visited = {}) {
    const key = `${row},${col}`;
    if (visited[key]) return;
    visited[key] = true;

    if (field[row][col].minesAround !== 0) return;
    field[row][col].isRevealed = true;

    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;

            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !field[newRow][newCol].isMine) {
                revealZeros(newRow, newCol, field, rows, cols, visited);
            }
        }
    }
}




// візуальна частина - це для розуміння що відбуважться ящо дуже важко сприймати колонку.

function board(field) {
    const board = document.createElement('div');
    board.classList.add('board');

    field.forEach((element) => {
        const line = document.createElement('div');
        line.classList.add('line');
        board.append(line);

        element.forEach((item) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (item.isRevealed) {
                if (item.isMine === true) {
                    cell.classList.add('red');
                } else {
                    cell.classList.add('green');
                }
            }

            if (!item.isMine) {
                cell.textContent = item.minesAround;
            } else {
                cell.textContent = '💣';
            }

            line.append(cell);
        });
    });

    document.body.append(board);
}
