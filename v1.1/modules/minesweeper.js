class Cell {
    constructor({ isMine, isRevealed, minesAround, row, col }) {
        this.isMine = isMine;
        this.isRevealed = isRevealed;
        this.minesAround = minesAround;
        this.row = row;
        this.col = col;
    }

    toPublic() {
        return {
            isRevealed: this.isRevealed,
            isMine: this.isRevealed ? this.isMine : null,
            minesAround: this.isRevealed ? this.minesAround : null,
            row: this.row,
            col: this.col,
        };
    }
}

class MinesGenerator {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
    }

    generate(field) {
        let minesPlaced = 0;

        while (minesPlaced < this.mines) {
            const a = Math.floor(Math.random() * this.rows);
            const b = Math.floor(Math.random() * this.cols);
            const cell = field[a][b];
            if (!cell.isMine) {
                cell.isMine = true;
                minesPlaced++;
            }
        }
    }
}

export class Minesweeper {
    status = 'playing'; // 'playing', 'won', 'lost'
    constructor({ rows, cols, mines }, minesGenerator) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.field = [];
        this.minesGenerator = minesGenerator ?? new MinesGenerator(rows, cols, mines);
        this.createField();

    }


    showFieldForPlayer() {
        return this.field.map(row =>
            row.map(cell => cell.toPublic())
        );
    }

    createField() {
        for (let row = 0; row < this.rows; row++) {
            const currentRow = [];

            for (let col = 0; col < this.cols; col++) {
                const cell = new Cell({
                    isMine: false,
                    isRevealed: false,
                    minesAround: 0,
                    row: row,
                    col: col,
                });
                currentRow.push(cell);
            }

            this.field.push(currentRow);
        }
        this.minesGenerator.generate(this.field);
        this.araund();
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
    click([x, y]) { // minesweeper.click([0, 0])
        if (this.status !== 'playing') {
            return { code: 'gameOver', message: 'Game is already over' };
        }

        this.field[x][y].isRevealed = true;

        if (this.field[x][y].isMine === true) {
            this.status = 'lost';
            return { code: 'mine', message: 'You clicked on a mine!' };
        }

        if (this.field[x][y].minesAround === 0) {
            this.revealZeros(x, y)
        }

        return { code: 'ok', message: 'Cell revealed' };
    }

    revealZeros(row, col, rows, cols, visited = {}) {
        const key = `${row},${col}`;
        if (visited[key]) return;
        visited[key] = true;

        this.field[row][col].isRevealed = true;

        if (this.field[row][col].minesAround !== 0) return;

        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;

                const newRow = row + dr;
                const newCol = col + dc;

                const endCondition = newRow < 0 || newRow >= this.rows || newCol < 0 || newCol >= this.cols;
                if (
                    !endCondition &&
                    !this.field[newRow][newCol].isMine
                ) {
                    this.revealZeros(newRow, newCol, rows, cols, visited);
                }
            }
        }
    }
}
