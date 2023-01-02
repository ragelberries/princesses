import { useEffect, useRef } from "react";
import { Position } from "../DressUpReducer";

export interface PaintableWidgetProps {
    url: string;
    position: Position;
}

const PaintableWidget = ({ url, position }: PaintableWidgetProps) => {
    const myCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = myCanvas.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        const image = new Image();
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0)
        };
        image.src = url;
    }, []);

    return <canvas ref={myCanvas} style={{left: position.x, top: position.y}}/>;
}

export default PaintableWidget;