import './ClothingStage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import DraggableItemProps from "./DraggableItem";
import { princessId, DressUpState, DressUpDispatcher } from "../DressUpReducer";
import DressUpToolBox from "./ClothingToolBox";
import home from '/src/assets/home.png';
import forwardArrow from '/src/assets/forwardarrow.png';
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
        let response = await axios.get('/clothing-data/' + menuState.characterIdentifier);
        let data: ClothingData = response.data;
        setClothingData(data);
        console.log(data);

        if (state.length < 2) {
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

    }

    useEffect(() => { fetchData() }, []);

    const gotoHome = () => {
        setMenuState({ view: View.Menu, characterIdentifier: null });
    }

    if (!clothingData) {
        return <h1>Fetching...</h1>
    }

    return (
        <div>
            {state.map(item => (
                <DraggableItemProps key={item.id} item={item} dispatch={stateDispatch} />
            ))}
            <DressUpToolBox items={clothingData.itemsData} dispatch={stateDispatch} />
            <img className="homeNavigation" src={home} onClick={gotoHome} />
            <img className="makeupNavigation" src={forwardArrow} onClick={() => setMenuState({ view: View.MakeUp, characterIdentifier: menuState.characterIdentifier })} />
        </div >
    )
}



export default ClothingStage;

