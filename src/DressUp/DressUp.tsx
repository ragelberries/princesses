import { useReducer } from "react";
import DressUpItemWidget from "./DressUpItemWidget";
import DressUpToolBox from "./DressUpToolBox";
import { DressUpItem } from "./DressUpTypes";

interface DressUpAction {
    type: string;
    item: DressUpItem;
}

const princessId = 0;
export { princessId }

const reducer = (state: DressUpItem[], action: DressUpAction) => {
    if (action.item.id === princessId && action.type !== 'move') {
        return state;
    }

    if (action.type === 'add') {
        return [...state, action.item];
    } else if (action.type === 'remove') {
        return state.filter(item => item.id !== action.item.id);
    } else if (action.type === 'move') {
        return [...state.filter(item => item.id !== action.item.id), action.item];
    }

    throw new Error('Invalid action ' + action.type);
}

const DressUp = () => {
    const princessItem: DressUpItem = {
        id: princessId,
        url: '/princesses/young/princess.png',
        position: { x: 100, y: 100 },
        z: 100
    };
    const [items, dispatch] = useReducer(reducer, [princessItem]);
    return (
        <div>
            {items.map(item => (
                <DressUpItemWidget key={item.id} item={item} dispatch={dispatch} />
            ))}
            <DressUpToolBox dispatch={dispatch} />
        </div>
    )
}

export default DressUp;
export type { DressUpAction, DressUpItem };