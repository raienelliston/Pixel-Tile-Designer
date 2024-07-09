import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";

const CanvasWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: all;
`;

const PixalCanvas = () => {
    const [pixels, setPixels] = useState([]);
    const [showGrid, setShowGrid] = useState(true);
    const [pixelSize, setPixelSize] = useState(10);
    const [stageX, setStageX] = useState(0);
    const [stageY, setStageY] = useState(0);
    const [stageScale, setStageScale] = useState(1);
    const [historyStep, setHistoryStep] = useState(0);
    let history = [];

    const onWheel = (e) => {
        e.evt.preventDefault();
        
        const scaleBy = 1.02;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setStageScale(newScale)
        setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale)
        setStageY( -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale)
    }


    const undo = () => {
        if (historyStep > 0) {
            setHistoryStep(historyStep - 1);
            stage.clear();
            stage.load(history[historyStep - 1]);
        }
    }

    const redo = () => {
        if (historyStep < history.length) {
            setHistoryStep(historyStep + 1);
            stage.clear();
            stage.load(history[historyStep + 1]);
        }
    }

    return (
        <CanvasWrapper>
            <Stage 
            width={window.innerWidth} 
            height={window.innerHeight}
            onWheel={onWheel}
            scaleX={stageScale}
            scaleY={stageScale}
            x={stageX}
            y={stageY}
            draggable
            >
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
                    <Rect
                        x={0}
                        y={0}
                        width={100}
                        height={100}
                        fill="white"
                    />
                </Layer>
            </Stage>
        </CanvasWrapper>
    );
}

export default PixalCanvas;