import modeOptions from "./modeOptions";

const Mode = ({ selectedMode, onModeChange, disabled }) => {
    
    const handleModeChange = (e) => {
        if (disabled) return;
        onModeChange(e.target.value);
    };

    return (
        <div className="mode">
            <label>
                <p>Mode</p>
                <select
                    name="mode" 
                    value={selectedMode} 
                    onChange={handleModeChange}
                    disabled={disabled}
                >
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