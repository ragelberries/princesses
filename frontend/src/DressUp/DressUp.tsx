import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import DressUpItemWidget from "./DressUpItemWidget";
import { princessId, dressUpReducer } from "./DressUpReducer";
import DressUpToolBox from "./DressUpToolBox";
import './DressUp.css'

interface DressUpProps {
}

interface CharacterData {
    characterData: ItemData;
    itemsData: ItemData[];
}

export interface ItemData {
    url: string;
    z: number;
}

const DressUp = () => {
    const { identifier } = useParams();
    const [state, stateDispatch] = useReducer(dressUpReducer, []);
    const [characterData, setCharacterData] = useState<CharacterData | undefined>(undefined);

    const fetchData = async () => {
        const url = '/character-data/' + identifier;
        console.log(url);
        let response = await axios.get(url);
        let data: CharacterData = response.data;
        setCharacterData(data);
        stateDispatch({
            type: 'reset',
            item: {
                id: princessId,
                url: data.characterData.url,
                position: { x: 300, y: 300 },
                z: data.characterData.z
            }
        });
    }

    useEffect(() => { fetchData() }, []);

    if (!characterData) {
        return <h1>Fetching...</h1>
    }

    return (
        <div>
            {state.map(item => (
                <DressUpItemWidget key={item.id} item={item} dispatch={stateDispatch} />
            ))}
            <DressUpToolBox items={characterData.itemsData} dispatch={stateDispatch} />
            <Link to="/">
                <img className="home" src="/home.png" />
            </Link>
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

