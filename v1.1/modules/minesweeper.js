export class Minesweeper {
    constructor(rows, cols, mines) {
        (this.rows = rows),
            (this.cols = cols),
            (this.mines = mines),
            (this.field = []),
            (this.closetField = []);
    }

    showFieldForPlayer() {
        return this.closetField;
    }

    showRealFieldForPlayer() {
        return this.field;
    }

    createField() {
        for (let row = 0; row < this.rows; row++) {
            const currentRow = [];
            const currentRowCloset = [];

            for (let col = 0; col < this.cols; col++) {
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
                });
            }

            this.field.push(currentRow);
            this.closetField.push(currentRowCloset);
        }
        this.minesGenerator();
        this.araund();
    }

    minesGenerator() {
        let minesPleced = 0;

        while (minesPleced < this.mines) {
            const a = Math.floor(Math.random() * this.rows);
            const b = Math.floor(Math.random() * this.cols);

            if (!this.field[a][b].isMine) {
                this.field[a][b].isMine = true;
                this.field[a][b].minesAround = '💣';
                minesPleced++;
            }
        }
    }

    araund() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.field[row][col].isMine) continue;

                let minesAround = 0;

                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;

                        const newRow = row + dr;
                        const newCol = col + dc;

                        if (
                            newRow >= 0 &&
                            newRow < this.rows &&
                            newCol >= 0 &&
                            newCol < this.cols &&
                            this.field[newRow][newCol].isMine
                        ) {
                            minesAround++;
                        }
                    }
                }
                this.field[row][col].minesAround = minesAround;
            }
        }
    }

    click([x, y]) {
        this.closetField[x][y].isRevealed = true;
        this.field[x][y].isRevealed = true;

        if (this.field[x][y].isMine === true) {
            this.closetField[x][y].isMine = true;
            console.log('stop game');
        }
        if (this.field[x][y].minesAround > 0) {
            this.closetField[x][y].minesAround = this.field[x][y].minesAround;
            this.field[x][y].isRevealed = true;
        } else {
            this.revealZeros(x, y)
        }

        if (this.field[x][y].minesAround === 0) {
            this.closetField[x][y].minesAround = this.field[x][y].minesAround;
            this.revealZeros(x, y)
        }
    }

    revealZeros(row, col, rows, cols, visited = {}) {
        const key = `${row},${col}`;
        if (visited[key]) return;
        visited[key] = true;

        this.closetField[row][col].isRevealed = true;
        this.closetField[row][col].minesAround = this.field[row][col].minesAround;

        if (this.field[row][col].minesAround !== 0) return;
        
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;

                const newRow = row + dr;
                const newCol = col + dc;

                if (
                    newRow >= 0 &&
                    newRow < this.rows &&
                    newCol >= 0 &&
                    newCol < this.cols &&
                    !this.field[newRow][newCol].isMine
                ) {
                    this.revealZeros(newRow, newCol, rows, cols, visited);
                }
            }
        }
    }
}
