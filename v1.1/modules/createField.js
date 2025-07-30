import { visualBoard } from "../modules/visualBoard.js";

export const createField = ({rows, cols, mines}) => {
    const field = [];
    const playerShow = [];
    
    function closedField() {
        console.log(playerShow);
    }

    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        const currentRowCloset = [];

        for (let col = 0; col < cols; col++) {
            currentRow.push({
                isMine: false,
                isRevealed: false,
                minesAround: 0,
                row: row,
                col: col,
            });

            currentRowCloset.push({
                isMine: 'unknown',
                isRevealed: 'unknown',
                minesAround: 'unknown',
                row: row,
                col: col,
            })
        }
        field.push(currentRow);
        playerShow.push(currentRowCloset);
    }

    minesGenerator(field, rows, cols, mines);
    araund(field, rows, cols);
    visualBoard(playerShow);
    closedField();
    
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

const araund = (field, rows, cols) => {
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
}

