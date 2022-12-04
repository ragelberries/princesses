import { useReducer } from "react";
import DressUpItemWidget from "./DressUpItemWidget";
import { princessId, reducer as itemsReducer } from "./DressUpState";
import DressUpToolBox from "./DressUpToolBox";

const DressUp = () => {
    const princessItem: DressUpItem = {
        id: princessId,
        url: '/princesses/young/princess.png',
        position: { x: 300, y: 300 },
        z: 100
    };
    const [items, itemsDispatch] = useReducer(itemsReducer, [princessItem]);
    return (
        <div>
            {items.map(item => (
                <DressUpItemWidget key={item.id} item={item} dispatch={itemsDispatch} />
            ))}
            <DressUpToolBox dispatch={itemsDispatch} />
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

