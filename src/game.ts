import * as fs from "fs";
import * as readline from 'readline';

import { menuHandler, tools } from "./index";
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
        console.log(await this.loadCards());

    }

    private async loadCards() {
        console.clear();
        console.log("Reading data from file...")

        let allCards: string[] = [];
        
        let lineReader = readline.createInterface({
            input: fs.createReadStream("dogs.txt")
        })
        lineReader.on("line", (line: string) => {
            allCards.push(line);
        })
        lineReader.on("close", async () => {
            console.log("Data read from file.");
            allCards = await tools.shuffle(allCards);
        })
        return allCards;
    }
}

export default Game;
