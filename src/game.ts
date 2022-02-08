import * as fs from "fs";
import * as readline from 'readline';
import * as input from 'input';

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
        while (this.playerCards.length !== 0 && this.computerCards.length !== 0) {
            console.clear();
            console.log(menuHandler.titleGen(`round ${this.roundNumber}`));
            console.log();
            console.log("Player's card:");
            console.log();
            tools.displayCard(this.playerCards[0]);
            console.log();
            let options: object[] = [{name: "Exercise", value: 0}, {name: "Intelligence", value: 1}, {name: "Friendliness", value: 2}, {name: "Drool", value: 3}];
            let choice: number = await input.select('Choose which statistic you want to compare: ', options);

            console.clear();
            console.log(menuHandler.titleGen(`round ${this.roundNumber}`));
            console.log();
            console.log("Computer's card:");
            console.log();
            tools.displayCard(this.computerCards[0]);
            console.log();

            await this.compareCards(this.playerCards[0], this.computerCards[0], choice);
            this.roundNumber++;
            console.clear();
        }

        if (this.computerCards.length === 0) {
            console.log(menuHandler.titleGen("player wins!"));
        } else {
            console.log(menuHandler.titleGen("computer wins!"));
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

    private async compareCards(player: Card, computer: Card, stat: number) {
        let statName: string;
        switch(stat) {
            case 0:
                statName = "exercise";
                break;
            case 1:
                statName = "intelligence";
                break;
            case 2:
                statName = "friendliness";
                break;
            case 3:
                statName = "drool";
                break;
        }

        if (statName !== "drool" && (player[statName] > computer[statName])) {
            console.log("Player wins round!");
            this.playerCards.push(computer);
            this.playerCards.push(player);
            this.playerCards.splice(0, 1);
            this.computerCards.splice(0, 1);
        } else if (statName === "drool" && (player[statName] < computer[statName])) {
            console.log("Player wins round!");
            this.playerCards.push(computer);
            this.playerCards.push(player);
            this.playerCards.splice(0, 1);
            this.computerCards.splice(0, 1);
        } else if (player[statName] === computer[statName]) {
            console.log("Draw!");
            this.playerCards.push(player);
            this.playerCards.splice(0, 1);
            this.computerCards.push(computer);
            this.computerCards.splice(0, 1);
        } else {
            console.log("Computer wins round!");
            this.computerCards.push(player);
            this.computerCards.push(computer);
            this.playerCards.splice(0, 1);
            this.computerCards.splice(0, 1);
        }
        console.log();
        await input.text("Press enter to continue...");
    }
}

export default Game;
