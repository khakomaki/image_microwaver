import Timer from "./Timer";
import Mode from "./Mode";

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

export default ControlPanel;