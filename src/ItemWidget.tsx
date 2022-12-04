import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface ItemWidgetProps {
    url: string;
    initialPos: { x: number; y: number };
}

const ItemWidget = (props: ItemWidgetProps) => {
    const [position, setPosition] = useState({
        x: props.initialPos.x,
        y: props.initialPos.y
    });

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition({
            x: data.x,
            y: data.y
        })
    }

    return (
        <Draggable position={position} onStop={handleDrag}>
            <img
                draggable="false"
                src={props.url}
                style={{ position: 'absolute' }}
            />
        </Draggable>
    )
}

export default ItemWidget;