import React from "react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";

const ToolOverlayWrapper = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    pointer-events: none;
`;

const TopOverlayWrapper = styled(ToolOverlayWrapper)`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
`;

const LeftOverlayWrapper = styled(ToolOverlayWrapper)`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 10%;
    left: 0;
    width: 10%;
    height: 90%;
`;

const RightOverlayWrapper = styled(ToolOverlayWrapper)`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 10%;
    right: 0;
    width: 10%;
    height: 90%;
`;

const ToolOverlay = () => {
    const [fileName, setFileName] = useState("");
    const [colors, setColors] = useState(["black", "white"]);

    if (localStorage.getItem("fileName")) {
        if (localStorage.getItem("fileName") !== fileName) {
            setFileName(localStorage.getItem("fileName"));
        }
    } else {
        localStorage.setItem("fileName", "Untitled");
    }


    // All the logic to turn the local storage data into a file
    const saveFile = () => {

    }

    // All the logic to turn the local storage data into a file that can be used, aka .png
    const exportFile = () => {

    }

    const TopOverlay = () => {
        return (
            <TopOverlayWrapper>
                <p>Tool Overlay</p>
            </TopOverlayWrapper>
        );
    }

    const LeftOverlay = () => {

        const colorPicker = () => {

        }

        return (
            <LeftOverlayWrapper>
                <p>Tool Overlay</p>
            </LeftOverlayWrapper>
        );
    }

    const RightOverlay = () => {
        return (
            <RightOverlayWrapper>
                <p>Tool Overlay</p>
            </RightOverlayWrapper>
        );
    }

    return (
        <ToolOverlayWrapper>
            <TopOverlay />
            <LeftOverlay />
            <RightOverlay />
        </ToolOverlayWrapper>
    );
}

export default ToolOverlay;