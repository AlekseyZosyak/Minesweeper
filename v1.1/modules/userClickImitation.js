
export const userClickImitation = (x, y) => {
    const a = Math.floor(Math.random() * x);
    const b = Math.floor(Math.random() * y);
    console.log(a);
    console.log(b);

    for (let row = 0; row < x; row++) {
        for (let col = 0; col < y; col++) {
            if (field[row][col].isMine) continue;

            let minesAround = 0;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;

                    const newRow = row + dr;
                    const newCol = col + dc;

                    if ( newRow >= 0 && newRow < x && newCol >= 0 && newCol < y && field[newRow][newCol].isMine) {
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