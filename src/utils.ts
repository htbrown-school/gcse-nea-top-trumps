import * as input from 'input';

export interface Settings {
    cards: number;
}

export class MenuHandler {
    constructor() {  }

    private titleGen(content: string): string {
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