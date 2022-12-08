import './DraggableItem.css';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DressUpAction, DressUpItem } from "../DressUpReducer";
import { useRef, useState } from "react";

interface DraggableItemProps {
    item: DressUpItem;
    dispatch: (a: DressUpAction) => void;
}

const DraggableItemProps = ({ item, dispatch }: DraggableItemProps) => {
    const [dragging, setDragging] = useState(false);

    const handleStart = (e: DraggableEvent, data: DraggableData): false | void => {
        setDragging(true);
    }

    const handleStop = (e: DraggableEvent, data: DraggableData): false | void => {
        setDragging(false);
        dispatch({ type: 'move', item: { ...item, position: { x: data.x, y: data.y } } });
    }

    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} position={item.position} onStart={handleStart} onStop={handleStop}>
            <img ref={nodeRef} className="itemWidget" onDoubleClick={() => dispatch({ type: 'remove', item: item })}
                src={item.url}
                draggable="false"
                style={{ zIndex: item.z + (dragging ? 1 : 0) }}
            />
        </Draggable>
    )
}


export default DraggableItemProps;

