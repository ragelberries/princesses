import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DressUpAction, DressUpItem } from "./DressUp";

interface DressUpItemWidgetProps {
    item: DressUpItem;
    dispatch: (a: DressUpAction) => void;
}

const DressUpItemWidget = ({ item, dispatch }: DressUpItemWidgetProps) => {

    const handleStop = (e: DraggableEvent, data: DraggableData): false | void => {
        dispatch({ type: 'move', item: { ...item, position: { x: data.x, y: data.y } } });
    }

    return (
        <Draggable position={item.position} onStop={(e, data) => handleStop(e, data)}>
            <div>
                <img onDoubleClick={() => dispatch({ type: 'remove', item: item })}
                    src={item.url}
                    draggable="false"
                    style={{ position: 'fixed' }}
                />
            </div>
        </Draggable>
    )
}


export default DressUpItemWidget;
