import React from "react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from "styled-components";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import pencilIcon from "../assets/pencilIcon.png";
import paintIcon from "../assets/paintIcon.png";

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

const FileSettingsOverlayWrapper = styled(ToolOverlayWrapper)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center
    z-index: 101;
`;

const TopOverlayWrapper = styled(ToolOverlayWrapper)`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
    pointer-events: all;
`;

const LeftOverlayWrapper = styled(ToolOverlayWrapper)`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 10%;
    left: 0;
    width: 10%;
    height: 90%;
    pointer-events: all;
`;

const RightOverlayWrapper = styled(ToolOverlayWrapper)`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 10%;
    right: 0;
    width: 10%;
    height: 90%;
    pointer-events: all;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        color: white;
        font-size: 1em;
    }
`;

const ToolOverlay = () => {
    const [fileName, setFileName] = useState("");
    const [colors, setColors] = useState(["black", "white"]);
    const [fileOptionsOverlay, setFileOptionsOverlay] = useState(false);

    if (localStorage.getItem("fileName")) {
        if (localStorage.getItem("fileName") !== fileName) {
            setFileName(localStorage.getItem("fileName"));
        }
    } else {
        localStorage.setItem("fileName", "Untitled");
    }


    // All the logic to turn the local storage data into a file
    const saveFile = () => {
        const saveFileData = JSON.stringify({
            fileName: localStorage.getItem("fileName"),
            pixels: JSON.parse(localStorage.getItem("pixels")),
            colors: localStorage.getItem("colors"),
        });

        const blob = new Blob([saveFileData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = localStorage.getItem("fileName") + ".JSON";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
            
    }

    const loadFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileData = JSON.parse(e.target.result);

            localStorage.setItem("fileName", fileData.fileName);
            localStorage.setItem("pixels", JSON.stringify(fileData.pixels));
            localStorage.setItem("colors", fileData.colors);

            window.location.reload();
        }

        reader.readAsText(file);
    }

    // All the logic to turn the local storage data into a file that can be used, aka .png
    const exportFile = () => {

        function convertToPNG(pixels) {
            return
        }

        const exportFileData = convertToPNG(JSON.parse(localStorage.getItem("pixels")));

        const blob = new Blob([exportFileData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = localStorage.getItem("fileName") + ".JSON";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    const FileSettingsOverlay = () => {
        if (fileOptionsOverlay) {
            return (
                <FileSettingsOverlayWrapper>
                    <p>File Settings</p>
                </FileSettingsOverlayWrapper>
            );
        }
        return null;
    }

    // Component that shows at the top of the webpage
    const TopOverlay = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleTitleChange = (e) => {
            if (keyboard.key === "Enter") {
                localStorage.setItem("fileName", e.target.value);
            }
            setFileName(e.target.value);
        }

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        }

        return (
            <TopOverlayWrapper>
                <TitleWrapper>
                    <input type="text" value = {fileName} onChange={handleTitleChange} />
                </TitleWrapper>
                <input type="button" value="File" onClick={handleClick} />
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={fileOptionsOverlay}>File Options</MenuItem>
                    <MenuItem onClick={saveFile}>Save</MenuItem>
                    <MenuItem> <input type="file" onChange={loadFile} /> </MenuItem>
                    <MenuItem onClick={exportFile}>Export</MenuItem>
                </Menu>
            </TopOverlayWrapper>
        );
    }

    // Component that shows on the left side of the webpage
    const LeftOverlay = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedTool, setSelectedTool] = useState(localStorage.getItem("tool") || "pencil");
        
        if (localStorage.getItem("tool") === null) {
            localStorage.setItem("tool", "pencil");
        }
        if (localStorage.getItem("tool") !== selectedTool) {
            setSelectedTool(localStorage.getItem("tool"));
        }

        const ColorPicker = (color, index) => {
            if (isOpen) {

                const handleChange = (e) => {
                    var newColors = colors;
                    newColors[index] = e.target.value;
                    setColors(newColors);
                    localStorage.setItem("colors", newColors);
                }

                const Popover = () => {
                    if (isOpen) {
                        return (
                            <HexColorPicker color={color} onChange={handleChange}/>
                        );
                    }
                    return null;
                }

                return (
                    <div className="color-picker">
                        <div className="swatch" style={{ backgroundColor: color }} onClick={setIsOpen(true)}/>
                        <Popover />
                    </div>
                );
            }
            return null;
        }

        const handleToolChange = (e) => {
            if (e.target.src === pencilIcon) {
                localStorage.setItem("tool", "pencil");
            } else if (e.target.src === paintIcon) {
                localStorage.setItem("tool", "paint");
            }
            setSelectedTool(localStorage.getItem("tool"));
        }

        return (
            <LeftOverlayWrapper>
                <div className="toolPicker">
                    <img src={pencilIcon} alt="Pencil Icon" onClick={handleToolChange}/>
                    <img src={paintIcon} alt="Paint Icon" onClick={handleToolChange}/>
                </div>
                <div>
                    {colors.map((color, index) => {
                        return (
                            <ColorPicker color={color} index={index} />
                        );
                    })}
                </div>

            </LeftOverlayWrapper>
        );
    }

    // Component that shows on the right side of the webpage
    const RightOverlay = () => {
        return (
            <RightOverlayWrapper>
                <p>Tool Overlay</p>
            </RightOverlayWrapper>
        );
    }

    return (
        <ToolOverlayWrapper>
            <FileSettingsOverlay />
            <TopOverlay />
            <LeftOverlay />
            <RightOverlay />
        </ToolOverlayWrapper>
    );
}

export default ToolOverlay;