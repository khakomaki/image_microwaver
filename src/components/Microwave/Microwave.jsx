import { useState } from "react";
import ControlPanel from "./ControlPanel";
import Door from "./Door";

const Microwave = () => {
    const [timerValue, setTimerValue] = useState(0);
    const [selectedMode, setMode] = useState('Normal')
    const [isDoorOpen, setDoorOpen] = useState(false);

    // sets new timer value state
    const handleTimerChange = (value) => {
        setTimerValue(value);
    }

    // toggles door open/close state
    const handleDoorOpen = () => {
        setDoorOpen((lastDoorState) => !lastDoorState);
    }

    // sets new mode state
    const handleModeChange = (mode) => {
        setMode(mode)
    }

    // fully functioning microwave
    return (
        <div className="microwave">
            <Door isOpen={isDoorOpen} onOffToggle={handleDoorOpen}></Door>
            <ControlPanel timerValue={timerValue} onTimerChange={handleTimerChange} selectedMode={selectedMode} onModeChange={handleModeChange}></ControlPanel>
        </div>
    );
};

export default Microwave;