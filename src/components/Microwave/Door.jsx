import doorOpenImage from "../../images/microwave_door_open.png"
import doorClosedImage from "../../images/microwave_door_closed.png";

const Door = ({ isOpen, onOffToggle, insideElements }) => {

    // door with on/off toggle, shows door when closed
    return (
        <>
            <div className="door" onClick={onOffToggle}>
                <img src={doorOpenImage} className="background-elements" id="open-door"/>
                <div className="sandwich-elements">
                    {insideElements}
                </div>
                {!isOpen && (
                    <img src={doorClosedImage} className="foreground-elements" id="closed-door"/>
                )}
            </div>
        </>
    )
};

export default Door;