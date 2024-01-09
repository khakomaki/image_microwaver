import modeOptions from "./modeOptions";

const Mode = ({ selectedMode, onModeChange }) => {
    return (
        <div className="mode">
            <label>
                <p>Mode</p>
                <select name="mode" value={selectedMode} onChange={(e) => onModeChange(e.target.value)}>
                    {modeOptions.map((mode) => (
                        <option key={mode.name} value={mode.name}>
                            {mode.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default Mode;