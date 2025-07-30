import { visualBoard } from "./modules/visualBoard.js";
import { Minesweeper } from "./modules/minesweeper.js";

const settings = {
    rows: 5,
    cols: 5,
    mines: 5
}

const userClickImitation = (x, y) => {
    const a = Math.floor(Math.random() * x);
    const b = Math.floor(Math.random() * y);
    console.log(`coordinates row : ${a}`);
    console.log(`coordinates col : ${b}`);
    return [a, b];
}


const memory = new Minesweeper(settings.rows, settings.cols, settings.mines);
memory.showRealFieldForPlayer();
memory.createField();
memory.click(userClickImitation(settings.rows, settings.cols))
console.log(memory.showFieldForPlayer());


visualBoard(memory.showRealFieldForPlayer(), memory.showFieldForPlayer());




