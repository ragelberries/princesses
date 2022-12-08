import './ClothingStage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import DraggableItemProps from "./DraggableItem";
import { princessId, DressUpState, DressUpDispatcher } from "../DressUpReducer";
import DressUpToolBox from "./ClothingToolBox";
import  home from '/src/assets/home.png';
import makeup from '/src/assets/forwardarrow.png';

interface ClothingStageProps {
    state: DressUpState,
    stateDispatch: DressUpDispatcher
}

interface ClothingData {
    characterData: ItemData;
    itemsData: ItemData[];
}

export interface ItemData {
    url: string;
    z: number;
}

const ClothingStage = ({state, stateDispatch}: ClothingStageProps) => {
    const [clothingData, setClothingData] = useState<ClothingData | undefined>(undefined);
    const { identifier } = useParams();

    const fetchData = async () => {
        if (identifier) {
            let response = await axios.get('/clothing-data/' + identifier);
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
            <Link to="/">
                <img className="homeNavigation" src={home} />
            </Link>
            <Link to="/makeup">
                <img className="makeupNavigation" src={makeup} />
            </Link>
        </div >
    )
}



export default ClothingStage;
