import { MenuHandler, Tools } from './utils';
import Game from './game';

export const menuHandler: MenuHandler = new MenuHandler();
export const tools: Tools = new Tools();
const game: Game = new Game();

const main = async () => {
    while (true) {
        let menuResult = await menuHandler.mainMenu();
        switch (menuResult) {
            case 0:
                await game.main();
                break;
            case 1:
                await game.rules();
                break;
            case 2:
                console.log("Goodbye.");
                process.exit(1);
        }
    }
}

main();