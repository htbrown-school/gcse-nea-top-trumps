import * as input from 'input';

export class MenuHandler {
    constructor() {  }

    async mainMenu(): Promise<number> {
        console.log("=== MAIN MENU ===");

        let options: object[] = [{name: "Play", value: 0}, {name: "Quit", value: 1}];
        let result = await input.select("Choose an option: ", options);
        return result;
    }
}