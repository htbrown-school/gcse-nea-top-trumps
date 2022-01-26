import * as fs from "fs";
import * as readline from 'readline';

import { menuHandler } from "./index";
import { Settings } from "./utils";

interface Card {
    name: string;
    exercise: number;
    intelligence: number;
    friendliness: number;
    drool: number;
}

class Game {
    constructor() {}

    private settings: Settings;
    private cards: Card[];

    async main() {
        this.settings = await menuHandler.setupMenu();
        this.loadCards();
    }

    private loadCards() {
        let allCards: string[] = [];
        
        let lineReader = readline.createInterface({
            input: fs.createReadStream("dogs.txt")
        })
        lineReader.on("line", (line) => {
            allCards.push(line);
        })

        console.log(allCards);
    }
}

export default Game;
