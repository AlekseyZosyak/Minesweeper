export function visualBoard(field, closedField) {
    const board = document.createElement('div');
    board.classList.add('board');
    const text1 = document.createElement('h3');
    text1.textContent = 'Real dec';

    field.forEach((element) => {
        const line = document.createElement('div');
        line.classList.add('line');
        board.append(line);

        element.forEach((item) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (item.isRevealed === true) {
               

                if (item.isMine === true) {
                    cell.classList.add('red');
                } else {
                    cell.classList.add('green');
                }
            }

            if (typeof item.minesAround === 'number') {
                cell.textContent = item.minesAround;
            }

            if (item.isMine === true) {
                cell.textContent = '💣';
            }

            line.append(cell);
        });
    });

    document.body.append(board);
    board.prepend(text1);

    const closetBoard = document.createElement('div');
    closetBoard.classList.add('board');
    const text2 = document.createElement('h3');
    text2.textContent = 'Show for player';

    closedField.forEach((element) => {
        const line = document.createElement('div');
        line.classList.add('line');
        closetBoard.append(line);

        element.forEach((item) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (item.isRevealed === true) {
                cell.classList.add('green');

                if (item.isMine === true) {
                    cell.classList.add('red');
                    cell.textContent = '💣';
                }
            }

            if (typeof item.minesAround === 'number') {
                if (item.minesAround > 0) {
                    cell.textContent = item.minesAround;
                } else {
                    cell.textContent = ' ';
                }
                
            }

            line.append(cell);
        });
    });
    document.body.append(closetBoard);
    closetBoard.prepend(text2);
}
