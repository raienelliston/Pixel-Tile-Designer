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
    const [pixelSize, setPixelSize] = useState(10);
    const [stageX, setStageX] = useState(0);
    const [stageY, setStageY] = useState(0);
    const [stageScale, setStageScale] = useState(1);
    const [historyStep, setHistoryStep] = useState(0);
    let history = [];

    if (localStorage.getItem("showGrid") === null) {
        localStorage.setItem("showGrid", "true");
    }

    const showGrid = localStorage.getItem("showGrid") === "true" ? true : false;

    if (pixels.length === 0) {
        if (localStorage.getItem("pixels")) {
            if (localStorage.getItem("pixels").length > 0) {
                // setPixels(JSON.parse(localStorage.getItem("pixels")));
            }
        } else {
            localStorage.setItem("pixels", JSON.stringify(pixels));
        }
    } else {
        localStorage.setItem("pixels", JSON.stringify(pixels));
    }

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

    const handleOnClick = (e) => {
        console.log(JSON.stringify(e))
        if(leftClick(e)) {
        const position = stage.getRelativePointerPosition();
        const x = Math.floor(position.x/ pixelSize) * pixelSize;
        const y = Math.floor(position.y / pixelSize) * pixelSize;
        const color = localStorage.getItem("color") || "black";
        const newPixel = { x: x, y: y, color: color };
        console.log("x: " + x + " y: " + y + " color: " + color)
        setPixels([...pixels, newPixel]);
        history = [...history, stage.toDataURL()];
        setHistoryStep(history.length)
        } elif (rightClick(e)) {
            const position = stage.getRelativePointerPosition();
            const x = Math.floor(position.x/ pixelSize) * pixelSize;
            const y = Math.floor(position.y / pixelSize) * pixelSize;
            setPixels(pixels.filter(pixel => pixel.x !== x && pixel.y !== y));
        }
    }

    const undo = (e) => {
        if (historyStep > 0) {
            const stage = e.target.getStage();
            setHistoryStep(historyStep - 1);
            stage.clear();
            stage.load(history[historyStep - 1]);
        }
    }

    const redo = (e) => {
        if (historyStep < history.length) {
            const stage = e.target.getStage();
            setHistoryStep(historyStep + 1);
            stage.clear();
            stage.load(history[historyStep + 1]);
        }
    }

    const Grid = () => {
        if (!showGrid) {
            return null;
        }
        return (
            <Layer>
                {[...Array(window.innerWidth / pixelSize).keys()].map((x) => {
                    return (
                        <Line
                            points={[x * pixelSize, 0, x * pixelSize, window.innerHeight]}
                        />
                    );
                })}
                {[...Array(window.innerHeight / pixelSize).keys()].map((y) => {
                    return (
                        <Line
                            key={y}
                            points={[0, y * pixelSize, window.innerWidth, y * pixelSize]}
                            stroke="black"
                            strokeWidth={1}
                        />
                    );
                })}
            </Layer>
        );
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
            onClick={handleOnClick}
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
                    <Grid />
                </Layer>
            </Stage>
        </CanvasWrapper>
    );
}

export default PixalCanvas;