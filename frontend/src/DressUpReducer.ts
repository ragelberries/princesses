export type DressUpState = DressUpItem[];

export interface DressUpAction {
    type: string;
    item: DressUpItem | undefined;
}

export type DressUpDispatcher = React.Dispatch<DressUpAction>;

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

const dressUpReducer = (state: DressUpState, action: DressUpAction) => {
    if (action.type === 'reset') {
        return [];
    } else if (action.item === undefined) {
        throw new Error('Only reset action can have undefined item')
    } else if (action.type === 'setup') {
        return [action.item];
    } else if (action.type === 'add') {
        return [...state, action.item];
    } else if (action.item.id === princessId && action.type !== 'move') {
        return state;
    } else if (action.type === 'remove') {
        return state.filter(item => item.id !== action.item!.id);
    } else if (action.type === 'move') {
        if (isWithinBounds(action.item.position)) {
            return [...state.filter(item => item.id !== action.item!.id), action.item];
        }
        return state;
    }

    throw new Error('Invalid action ' + action.type);
}

const princessId = 0;

function isWithinBounds(position: Position) {
    return position.x > 0 && position.y > 100;
}


export { dressUpReducer as stateReducer, princessId }