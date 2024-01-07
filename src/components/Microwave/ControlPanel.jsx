import Timer from "./Timer";
import Mode from "./Mode";

const ControlPanel = ({ timerValue, onTimerChange, selectedMode, onModeChange }) => {
    const modeOptions = ['Normal', 'Defrosting', 'Grill', 'Popcorn']

    return (
        // control panel for image manipulation controls
        <div className="control-panel">
            <Mode modes={modeOptions} selectedMode={selectedMode} onModeChange={onModeChange}></Mode>
            <Timer minValue={0} maxValue={100} timerValue={timerValue} onTimerChange={onTimerChange}></Timer>
        </div>
    );
};

export default ControlPanel;