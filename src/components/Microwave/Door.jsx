const Door = ({ isOpen, onOffToggle }) => {
    // door with on/off toggle, shows image insertion when open
    return (
        <div className="door">
            <p>Door</p>
            <button onClick={onOffToggle}>{isOpen ? "Close door" : "Open door"}</button>
            {isOpen && <p>(Image insertion here)</p>}
        </div>
    )
}

export default Door;