import { useReducer } from "react";
import { SetMenuState, View } from "../App";
import DressUpItemWidget from "./DressUpItemWidget";
import { princessId, dressUpReducer } from "./DressUpReducer";
import DressUpToolBox from "./DressUpToolBox";

interface DressUpProps {
    chosenCharacterIdentifier: string;
    setMenuState: SetMenuState
}

const DressUp = ({ chosenCharacterIdentifier, setMenuState }: DressUpProps) => {
    const princessItem: DressUpItem = {
        id: princessId,
        url: '/princesses/young/princess.png',
        position: { x: 300, y: 300 },
        z: 100
    };
    const [state, stateDispatch] = useReducer(dressUpReducer, [princessItem]);
    return (
        <div>
            <h1>{chosenCharacterIdentifier}</h1>
            {state.map(item => (
                <DressUpItemWidget key={item.id} item={item} dispatch={stateDispatch} />
            ))}
            <DressUpToolBox dispatch={stateDispatch} />
            <button onClick={() => setMenuState({ view: View.Menu, chosenCharacterIdentifier: null })}>Gå till meny</button>
        </div >
    )
}


export interface DressUpItem {
    id: number;
    url: string;
    position: Position;
    z: number;
}

export interface Position {
    x: number;
    y: number;
}

export default DressUp;

