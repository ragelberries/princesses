import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { SetMenuState, View } from "../App";
import DressUpItemWidget from "./DressUpItemWidget";
import { princessId, dressUpReducer } from "./DressUpReducer";
import DressUpToolBox from "./DressUpToolBox";

interface DressUpProps {
    displayName: string;
    identifier: string;
    setMenuState: SetMenuState
}

interface CharacterData {
    characterData: ItemData;
    itemsData: ItemData[];
}

export interface ItemData {
    url: string;
    z: number;
}

const DressUp = ({ displayName, identifier, setMenuState }: DressUpProps) => {
    const princessItem: DressUpItem = {
        id: princessId,
        url: '/princesses/young/princess.png',
        position: { x: 300, y: 300 },
        z: 100
    };
    const [state, stateDispatch] = useReducer(dressUpReducer, [princessItem]);
    const [characterData, setCharacterData] = useState<CharacterData | undefined>(undefined);

    const fetchData = async () => {
        let response = await axios.get('/character-data/' + identifier);
        setCharacterData(response.data);
    }

    useEffect(() => { fetchData() }, []);

    if (!characterData) {
        return <h1>Fetching...</h1>
    }

    return (
        <div>
            <h1>{displayName}</h1>
            {state.map(item => (
                <DressUpItemWidget key={item.id} item={item} dispatch={stateDispatch} />
            ))}
            <DressUpToolBox items={characterData.itemsData} dispatch={stateDispatch} />
            <button onClick={() => setMenuState({ view: View.Menu, characterIdentifier: null, characterDisplayName: null })}>Gå till meny</button>
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

