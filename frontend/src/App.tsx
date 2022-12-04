import { useState } from "react";
import DressUp from "./DressUp/DressUp";
import Menu from "./Menu/Menu";

interface MenuState {
    view: View;
    chosenCharacterIdentifier: string | null;
}

export enum View {
    Menu,
    DressUp
}

export type SetMenuState = React.Dispatch<React.SetStateAction<MenuState>>;

const App = () => {
    const initialMenuState: MenuState = { view: View.DressUp, chosenCharacterIdentifier: 'young' };
    const [menuState, setMenuState] = useState(initialMenuState);

    switch (menuState.view) {
        case View.DressUp: return <DressUp chosenCharacterIdentifier={menuState.chosenCharacterIdentifier!} setMenuState={setMenuState} />;
        case View.Menu: return <Menu setMenuState={setMenuState} />;
    }
}

export default App;