import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DressUpItem } from "./DressUp";
import { DressUpAction } from "./DressUpReducer";
import './DressUpItemWidget.css';
import { useState } from "react";

interface DressUpItemWidgetProps {
    item: DressUpItem;
    dispatch: (a: DressUpAction) => void;
}

const DressUpItemWidget = ({ item, dispatch }: DressUpItemWidgetProps) => {
    const [dragging, setDragging] = useState(false);

    const handleStart = (e: DraggableEvent, data: DraggableData): false | void => {
        setDragging(true);
    }

    const handleStop = (e: DraggableEvent, data: DraggableData): false | void => {
        setDragging(false);
        dispatch({ type: 'move', item: { ...item, position: { x: data.x, y: data.y } } });
    }

    return (
        <Draggable position={item.position} onStart={handleStart} onStop={handleStop}>
            <img className="itemWidget" onDoubleClick={() => dispatch({ type: 'remove', item: item })}
                src={item.url}
                draggable="false"
                style={{ zIndex: item.z + (dragging ? 1 : 0) }}
            />
        </Draggable>
    )
}


export default DressUpItemWidget;

