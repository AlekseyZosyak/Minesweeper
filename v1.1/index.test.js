import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Minesweeper } from "./modules/minesweeper.js";

const settings = {
    rows: 5,
    cols: 5,
    mines: 5
}

class FakeMinesGenerator {
    constructor({rows, cols, mines}) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
    }

    generate(field) {

        for (let col = 0; col < this.cols; col++) {
            field[0][col].isMine = true;
        }
    }
}


describe("Minesweeper", () => {
    it("should create a field with the correct dimensions", () => {
        const game = new Minesweeper(settings);
        strictEqual(game.field.length, settings.rows);
        strictEqual(game.field[0].length, settings.cols);
    });

    it("click should return response object with code 'mine' if clicked on a mine", () => {
        const fakeGenerator = new FakeMinesGenerator(settings);
        const game = new Minesweeper(settings, fakeGenerator);
        const response1 = game.click([1, 1]);
        strictEqual(response1.code, 'ok');
        strictEqual(response1.message, 'Cell revealed');
        const response2 = game.click([0, 0]);
        strictEqual(response2.code, 'mine');
        strictEqual(response2.message, 'You clicked on a mine!');
    });

    it('should return status "gameOver" if the game is already over', () => {
        const fakeGenerator = new FakeMinesGenerator(settings);
        const game = new Minesweeper(settings, fakeGenerator);
        game.click([0, 0]); // Click on a mine to end the game
        const response = game.click([1, 1]);
        strictEqual(response.code, 'gameOver');
        strictEqual(response.message, 'Game is already over');
    });

    it('should reveal all cells around a clicked cell if it has no mines around', () => {
        const fakeGenerator = new FakeMinesGenerator(settings);
        const game = new Minesweeper(settings, fakeGenerator);
        const response = game.click([4, 4]);
        strictEqual(response.code, 'ok');
        strictEqual(response.message, 'Cell revealed');
        const field = game.showFieldForPlayer();
        strictEqual(field[4][4].isRevealed, true);
        strictEqual(field[3][3].isRevealed, true);
        strictEqual(field[3][4].isRevealed, true);
        strictEqual(field[1][1].isRevealed, true);
        strictEqual(field[1][1].minesAround, 3);
    });
});





