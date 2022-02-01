import * as fs from "fs";
import * as readline from 'readline';

import { menuHandler, tools } from "./index";
import { Settings } from "./utils";

export interface Card {
    name: string;
    exercise: number;
    intelligence: number;
    friendliness: number;
    drool: number;
}

class Game {
    constructor() {}

    private settings: Settings;
    private playerCards: Card[] = [];
    private computerCards: Card[] = [];

    private roundNumber: number = 1;

    async main() {
        this.settings = await menuHandler.setupMenu();
        await this.loadCards();
        await this.roundLoop();
    }

    private async roundLoop() {
        console.clear();
        console.log(menuHandler.titleGen(`round ${this.roundNumber}`));
        console.log();
        while (this.playerCards.length !== 0 && this.computerCards.length !== 0) {
            tools.displayCard(this.playerCards[0]);
            let choice: number;
        }
    }

    private async loadCards() {
        console.clear();
        console.log('Loading cards...');
        let allCards: string[] = await tools.loadFile('dogs.txt');
        allCards = tools.shuffle(allCards);
        
        for (let i = 0; i < this.settings.cards; i++) {
            let newCard: Card = {
                name: allCards[i],
                exercise: Math.floor(Math.random() * 5),
                intelligence: Math.floor(Math.random() * 100),
                friendliness: Math.floor(Math.random() * 10),
                drool: Math.floor(Math.random() * 10)
            }

            if (i % 2 === 0) {
                this.playerCards.push(newCard);
            } else {
                this.computerCards.push(newCard);
            }
        }
        console.log('Cards loaded.');
    }
}

export default Game;
