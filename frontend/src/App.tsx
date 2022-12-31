import { useReducer, useState } from "react";
import ClothingStage from "./ClothingStage/ClothingStage";
import Menu from "./Menu/Menu";
import { stateReducer } from "./DressUpReducer";
import MakeupStage from "./MakeupStage/MakeUpStage";


export interface MenuState {
  view: View;
  characterIdentifier: string | null;
}

export enum View {
  Menu,
  Clothing,
  MakeUp
}

const App = () => {
  const initialMenuState: MenuState = {
    view: View.Menu,
    characterIdentifier: null,
  };
  const [menuState, setMenuState] = useState(initialMenuState);
  const [state, stateDispatch] = useReducer(stateReducer, []);

  switch (menuState.view) {
    case View.Menu:
      return <Menu setMenuState={setMenuState} stateDispatch={stateDispatch} />
    case View.Clothing:
      return <ClothingStage stateDispatch={stateDispatch} state={state} menuState={menuState} setMenuState={setMenuState} />
    case View.MakeUp:
      return <MakeupStage state={state} stateDispatch={stateDispatch} menuState={menuState} setMenuState={setMenuState} />
    default:
      throw new Error('Invalid menu stage ' + menuState.view);
  }

}

export default App;