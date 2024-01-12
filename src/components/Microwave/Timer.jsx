const Timer = ({ minValue, maxValue, timerValue, onTimerChange, disabled }) => {

    const handleTimerChange = (e) => {
        if (disabled) return;
        onTimerChange(parseInt(e.target.value, 10));
    };

    return (
        <div className="timer">
            <label>
            <p>Timer</p>
            <input
                type="range"
                min={minValue}
                max={maxValue}
                value={timerValue}
                onChange={handleTimerChange}
                disabled={disabled}
            />
            </label>
            {timerValue}
        </div>
    );
};

export default Timer;