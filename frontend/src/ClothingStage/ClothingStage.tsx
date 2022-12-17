import './ClothingStage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import DraggableItemProps from "./DraggableItem";
import { princessId, DressUpState, DressUpDispatcher } from "../DressUpReducer";
import DressUpToolBox from "./ClothingToolBox";
import home from '/src/assets/home.png';
import makeup from '/src/assets/forwardarrow.png';
import { MenuState, View } from '../App';

interface ClothingStageProps {
    state: DressUpState;
    stateDispatch: DressUpDispatcher;
    menuState: MenuState;
    setMenuState: (s: MenuState) => void;
}

interface ClothingData {
    characterData: ItemData;
    itemsData: ItemData[];
}

export interface ItemData {
    url: string;
    z: number;
}

const ClothingStage = ({ state, stateDispatch, menuState, setMenuState }: ClothingStageProps) => {
    const [clothingData, setClothingData] = useState<ClothingData | undefined>(undefined);

    const fetchData = async () => {
        console.log(menuState.characterIdentifier);
            let response = await axios.get('/clothing-data/' + menuState.characterIdentifier);
            let data: ClothingData = response.data;
            setClothingData(data);

            stateDispatch({
                type: 'reset',
                item: {
                    id: princessId,
                    url: data.characterData.url,
                    position: { x: 300, y: 200 },
                    z: data.characterData.z
                }
            });
        
    }

    useEffect(() => { fetchData() }, []);

    if (!clothingData) {
        return <h1>Fetching...</h1>
    }

    return (
        <div>
            {state.map(item => (
                <DraggableItemProps key={item.id} item={item} dispatch={stateDispatch} />
            ))}
            <DressUpToolBox items={clothingData.itemsData} dispatch={stateDispatch} />
            <img className="homeNavigation" src={home} onClick={() => setMenuState({view: View.Menu, characterIdentifier: null})} />
            <img className="makeupNavigation" src={makeup} onClick={() => setMenuState({view: View.Menu, characterIdentifier: null})} />
        </div >
    )
}



export default ClothingStage;

