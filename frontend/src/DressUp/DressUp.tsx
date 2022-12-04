import { useReducer } from "react";
import DressUpItemWidget from "./DressUpItemWidget";
import { princessId, dressUpReducer } from "./DressUpReducer";
import DressUpToolBox from "./DressUpToolBox";

const DressUp = () => {
    const princessItem: DressUpItem = {
        id: princessId,
        url: '/princesses/young/princess.png',
        position: { x: 300, y: 300 },
        z: 100
    };
    const [state, stateDispatch] = useReducer(dressUpReducer, [princessItem]);
    return (
        <div>
            {state.map(item => (
                <DressUpItemWidget key={item.id} item={item} dispatch={stateDispatch} />
            ))}
            <DressUpToolBox dispatch={stateDispatch} />
        </div>
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

