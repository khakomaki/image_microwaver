import PropTypes from 'prop-types';

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
        </div>
    );
};

Timer.propTypes = {
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    timerValue: PropTypes.number.isRequired,
    onTimerChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default Timer;