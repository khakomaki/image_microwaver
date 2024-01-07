const Timer = ({ minValue, maxValue, timerValue, onTimerChange }) => {
    return (
        <div className="timer">
            <label>
            <p>Timer</p>
            <input
                type="range"
                min={minValue}
                max={maxValue}
                value={timerValue}
                onChange={(e) => onTimerChange(parseInt(e.target.value, 10))}
            />
            </label>
            {timerValue}
        </div>
    );
};

export default Timer;