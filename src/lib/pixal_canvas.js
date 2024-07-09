import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";

const CanvasWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const PixalCanvas = () => {
    const [pixels, setPixels] = useState([]);
    const [showGrid, setShowGrid] = useState(true);
    const [pixelSize, setPixelSize] = useState(10);


    return (
        <CanvasWrapper>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {pixels.map((pixel, index) => {
                        return (
                            <Rect
                                key={index}
                                x={pixel.x}
                                y={pixel.y}
                                width={pixelSize}
                                height={pixelSize}
                                fill={pixel.color}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </CanvasWrapper>
    );
}

export default PixalCanvas;