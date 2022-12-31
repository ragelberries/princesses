import { useEffect, useRef } from "react";

export interface PaintableWidgetProps {
    url: string;
}
const PaintableWidget = ({ url }: PaintableWidgetProps) => {
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
        image.src = url;
        image.onload = () => {
            context.drawImage(image, 0, 0, 500, 700);
        };
    }, []);

    return <canvas ref={myCanvas} width={500} height={700} />;
}

export default PaintableWidget;