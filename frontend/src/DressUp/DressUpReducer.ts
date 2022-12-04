import { useReducer } from "react";
import { DressUpItem, Position } from "./DressUp";

const princessId = 0;

export interface DressUpAction {
    type: string;
    item: DressUpItem;
}

const dressUpReducer = (state: DressUpItem[], action: DressUpAction) => {
    if (action.item.id === princessId && action.type !== 'move') {
        return state;
    }

    if (action.type === 'add') {
        return [...state, action.item];
    } else if (action.type === 'remove') {
        return state.filter(item => item.id !== action.item.id);
    } else if (action.type === 'move') {
        if (isWithinBounds(action.item.position)) {
            return [...state.filter(item => item.id !== action.item.id), action.item];
        }
        return state;
    }

    throw new Error('Invalid action ' + action.type);
}

function isWithinBounds(position: Position) {
    return position.x > 0 && position.y > 100;
}
export { dressUpReducer, princessId }