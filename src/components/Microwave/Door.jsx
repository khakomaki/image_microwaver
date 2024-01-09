import doorOpenImage from "../../images/microwave_door_open.png"
import doorClosedImage from "../../images/microwave_door_closed.png";

const Door = ({ isOpen, onOffToggle }) => {
    // door with on/off toggle, shows door when closed
    return (
        <>
            <div className="door" onClick={onOffToggle}>
                <img src={doorOpenImage} className="background-elements" id="open-door"/>
                <div className="sandwich-elements">
                    <p>(Image insertion here)</p>
                </div>
                {!isOpen && (
                    <img src={doorClosedImage} className="foreground-elements" id="closed-door"/>
                )}
            </div>
        </>
    )
}

export default Door;