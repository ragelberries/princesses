import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DressUpItem } from "./DressUp";
import { DressUpAction } from "./DressUpReducer";
import './DressUpItemWidget.css';

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
                <img className="itemWidget" onDoubleClick={() => dispatch({ type: 'remove', item: item })}
                    src={item.url}
                    draggable="false"
                    style={{ zIndex: item.z }}
                />
        </Draggable>
    )
}


export default DressUpItemWidget;
