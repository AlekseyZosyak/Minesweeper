import { Minesweeper } from "./modules/minesweeper.js";

const settings = {
    rows: 5,
    cols: 5,
    mines: 5
}


const memory = new Minesweeper(settings.rows, settings.cols, settings.mines);
console.log(memory.click([0, 0]));
console.log(memory.showFieldForPlayer());


// visualBoard(memory.showRealFieldForPlayer(), memory.showFieldForPlayer());




