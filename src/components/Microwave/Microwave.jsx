import { useState } from "react";
import modeOptions from "./modeOptions";
import Timer from "./Timer";
import Mode from "./Mode";
import Door from "./Door";

const Microwave = () => {
    const [timerValue, setTimerValue] = useState(0);
    const [selectedMode, setMode] = useState('Normal');
    const [isDoorOpen, setDoorOpen] = useState(false);

    // gets value range of the mode
    const getModeRange = (mode) => {
        const selectedModeOption = modeOptions.find((option) => option.name === mode);

        return {
            minValue: selectedModeOption.minValue,
            maxValue: selectedModeOption.maxValue
        };
    }

    const [timerRange, setTimerRange] = useState(getModeRange('Normal'));

    // sets new timer value state
    const handleTimerChange = (value) => {
        setTimerValue(value);
    }

    // toggles door open/close state
    const handleDoorOpen = () => {
        setDoorOpen((lastDoorState) => !lastDoorState);
    }

    // sets new mode state, updates timer range and value
    const handleModeChange = (mode) => {
        setMode(mode);
        const range = getModeRange(mode);
        setTimerRange(range);
        setTimerValue(Math.floor((range.minValue + range.maxValue) / 2));
    }

    // fully functioning microwave
    return (
        <div className="microwave-frame">
            <div className="microwave">
                <Door isOpen={isDoorOpen} onOffToggle={handleDoorOpen}></Door>
                <div className="control-panel">
                    <Mode
                        selectedMode={selectedMode}
                        onModeChange={handleModeChange}
                    ></Mode>
                    <Timer
                        minValue={timerRange.minValue}
                        maxValue={timerRange.maxValue}
                        timerValue={timerValue}
                        onTimerChange={handleTimerChange}
                    ></Timer>
                </div>
            </div>
        </div>
    );
};

/*
                <ControlPanel
                    timerValue={timerValue}
                    timerRange={timerRange}
                    selectedMode={selectedMode}
                    onModeChange={handleModeChange}
                    onTimerChange={handleTimerChange}
                ></ControlPanel>



const ControlPanel = ({ timerValue, timerRange, onTimerChange, selectedMode, onModeChange }) => {
    return (
        // control panel for image manipulation controls
        <div className="control-panel">
            <Mode
                selectedMode={selectedMode}
                onModeChange={onModeChange}
            ></Mode>
            <Timer
                minValue={timerRange.minValue}
                maxValue={timerRange.maxValue}
                timerValue={timerValue}
                onTimerChange={onTimerChange}
            ></Timer>
        </div>
    );
};
*/

export default Microwave;