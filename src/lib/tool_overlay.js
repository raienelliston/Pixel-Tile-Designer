import React from "react";
import styled from "styled-components";

const ToolOverlayWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    z-index: 100;
`;

const TopOverlayWrapper = styled(ToolOverlayWrapper)`
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
`;

const LeftOverlayWrapper = styled(ToolOverlayWrapper)`
    top: 0;
    left: 0;
    width: 10%;
    height: 100%;
    float: left;
`;

const RightOverlayWrapper = styled(ToolOverlayWrapper)`
    top: 0;
    right: 0;
    width: 10%;
    height: 100%;
    float: right;
`;

const ToolOverlay = () => {

    const TopOverlay = () => {
        return (
            <TopOverlayWrapper>
                <p>Tool Overlay</p>
            </TopOverlayWrapper>
        );
    }

    const LeftOverlay = () => {
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