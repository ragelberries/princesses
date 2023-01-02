import { useCallback, useEffect, useRef, useState } from "react";
import { Position } from "../DressUpReducer";

export interface PaintableWidgetProps {
    url: string;
    imagePosition: Position;
}

const PaintableWidget = ({ url, imagePosition }: PaintableWidgetProps) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false)
    const [position, setPosition] = useState<any>(null)
    const activeColor = 'rgba(255, 0, 0, 0.1)'

    useEffect(() => {
        const canvasInstance = canvas.current;
        if (!canvasInstance) {
            return;
        }
        const context = canvasInstance.getContext('2d');
        if (!context) {
            return;
        }
        const image = new Image();
        image.onload = () => {
            canvasInstance.width = image.width;
            canvasInstance.height = image.height;
            context.drawImage(image, 0, 0)
        };
        image.src = url;
    }, []);

    const onDown = useCallback((event: any) => {
        const coordinates = getCoordinates(event)
        if (coordinates) {
            setPosition(coordinates)
            setDrawing(true)
        }
    }, [])

    const onUp = useCallback(() => {
        setDrawing(false)
        setPosition(null)
    }, [])

    const getCoordinates = (event: any) => {
        if (!canvas.current) {
            return null
        }

        const x = event.pageX || event.touches[0].pageX
        const y = event.pageY || event.touches[0].pageY

        return {
            x: x - canvas.current.offsetLeft,
            y: y - canvas.current.offsetTop
        }
    }

    const onMove = useCallback(
        (event: any) => {
            if (drawing) {
                const newPosition = getCoordinates(event)
                if (position && newPosition) {
                    drawLine(position, newPosition)
                    setPosition(newPosition)
                }
            }
        },
        [drawing, position]
    )

    const drawLine = (originalPosition: any, newPosition: any) => {
        if (!canvas.current) {
            return null
        }

        const context = canvas.current.getContext('2d')

        if (context) {
            context.strokeStyle = activeColor
            context.fillStyle = activeColor
            context.lineJoin = 'round'
            context.lineWidth = 5;

            context.beginPath()
            context.moveTo(originalPosition.x, originalPosition.y)
            context.lineTo(newPosition.x, newPosition.y)
            context.closePath()

            context.stroke()
        }
    }

    return <canvas
        ref={canvas}
        style={{ left: imagePosition.x, top: imagePosition.y }}
        onMouseDown={onDown}
        onTouchStart={onDown}
        onMouseUp={onUp}
        onTouchEnd={onUp}
        onMouseLeave={onUp }
        onMouseMove={onMove}
        onTouchMove={onMove}
        />;
}

export default PaintableWidget;