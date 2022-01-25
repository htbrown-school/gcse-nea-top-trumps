import * as input from 'input';

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
        return result;
    }

    async setupMenu(): number {

    }
}