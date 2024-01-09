import { useState } from "react";
import modeOptions from "./modeOptions";
import Display from "./Display";
import Timer from "./Timer";
import Mode from "./Mode";
import Door from "./Door";

const Microwave = () => {
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

    // converts value to time string
    const convertToTime = (value) => {
        // using absolute values and adding minus sign for negative value
        const sign = value < 0 ? '-' : '';
        const minutes = Math.floor(Math.abs(value / 60));
        const seconds = Math.abs(value) % 60;
        return String(sign) + String(minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds);
    }

    const rangeAverageInt = (range) => {
        return Math.floor((range.minValue + range.maxValue / 2));
    }
    
    const [timerValue, setTimerValue] = useState(() => {
        const range = getModeRange(selectedMode);
        return rangeAverageInt(range);
    });
    const [timerRange, setTimerRange] = useState(getModeRange(selectedMode));
    const [displayText, setText] = useState(convertToTime(timerValue));

    // sets new timer value state
    const handleTimerChange = (value) => {
        setTimerValue(value);
        updateMicrowaveDisplay(convertToTime(value));
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
        setTimerValue(rangeAverageInt(range));
        updateMicrowaveDisplay(mode);
    }

    // sets text to microwave display
    const updateMicrowaveDisplay = (text) => {
        setText(text);
    };

    // fully functioning microwave
    return (
        <div className="microwave-frame">
            <div className="microwave">
                <Door isOpen={isDoorOpen} onOffToggle={handleDoorOpen}></Door>
                <div className="control-panel">
                    <Display
                        text={displayText}
                    ></Display>
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

export default Microwave;