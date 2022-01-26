import { MenuHandler, Tools } from './utils';
import Game from './game';

export const menuHandler: MenuHandler = new MenuHandler();
export const tools: Tools = new Tools();
const game: Game = new Game();

const main = async () => {
    let menuResult = await menuHandler.mainMenu();
    switch (menuResult) {
        case 0:
            game.main();
            break;
        case 1:
            console.log("Goodbye.")
            process.exit(1);
    }
}

main();