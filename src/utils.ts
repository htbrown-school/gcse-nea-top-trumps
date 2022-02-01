import * as input from 'input';
import * as fs from 'fs';
import * as readline from 'readline';

import { Card } from './game';

export interface Settings {
    cards: number;
}

export class Tools {
    constructor() {}

    shuffle(array) {
        let currentIndex: number = array.length,
        randomIndex: number;

        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
        }

        return array;
    }

    displayCard(card: Card): void {
        console.log(card.name.toUpperCase());
        console.log(`Exercise: ${card.exercise}`);
        console.log(`Intelligence: ${card.intelligence}`);
        console.log(`Friendliness: ${card.friendliness}`);
        console.log(`Drool: ${card.drool}`);
    }

    async loadFile(file: string): Promise<string[]> {
        console.log("Reading data from file...");
        let returnArray: string[] = [];
        let fileStream = fs.createReadStream(file);
        let rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
        });

        for await (let line of rl) {
        returnArray.push(line);
        }

        console.log("Data read from file.");

        return returnArray;
    }
}

export class MenuHandler {
    constructor() {  }

    titleGen(content: string): string {
        return `===== ${ content.toUpperCase() } =====`;
    }

    async mainMenu(): Promise<number> {
        console.clear();
        console.log(this.titleGen("main menu"));

        let options: object[] = [{name: "Play", value: 0}, {name: "Quit", value: 1}];
        let result = await input.select("Choose an option: ", options);

        console.clear();
        return result;
    }

    async setupMenu(): Promise<Settings> {
        console.clear();
        console.log(this.titleGen("setup menu"))

        let result: number = await input.text("Enter the number of cards to be played (>= 4 and <= 30 and even)");
        while (result < 4 || result > 30 || result % 2 !== 0) {
            console.log("Invalid number.")
            result = await input.text("Enter the number of cards to be played (>= 4 and <= 30 and even)")
        }

        console.clear();
        return { cards: result };
    }
}