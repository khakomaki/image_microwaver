const Mode = ({ modes, selectedMode, onModeChange }) => {
    return (
        <div className="mode">
            <label>
                <p>Mode</p>
                <select name="mode" value={selectedMode} onChange={(e) => onModeChange(e.target.value)}>
                    {modes.map((mode) => (
                        <option key={mode} value={mode}>
                            {mode}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default Mode;