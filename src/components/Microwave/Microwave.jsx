import { useState } from "react";
import modeOptions from "./modeOptions";
import Display from "./Display";
import Timer from "./Timer";
import Mode from "./Mode";
import Door from "./Door";
import ImageUpload from "./ImageUpload";

const Microwave = () => {
    const [selectedMode, setMode] = useState('Normal');
    const [isDoorOpen, setDoorOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [microwaving, setMicrowaving] = useState(false);

    // gets value range of the mode
    const getModeRange = (mode) => {
        const selectedModeOption = modeOptions.find((option) => option.name === mode);

        return {
            minValue: selectedModeOption.minValue,
            maxValue: selectedModeOption.maxValue
        };
    }

    // converts value to time string
    const convertToTime = (value) => {
        // using absolute values and adding minus sign for negative value
        const sign = value < 0 ? '-' : '';
        const minutes = Math.floor(Math.abs(value / 60));
        const seconds = Math.abs(value) % 60;
        return String(sign) + String(minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds);
    }

    // calculates average integer of given range
    const rangeAverageInt = (range) => {
        return Math.floor((range.minValue + range.maxValue) / 2);
    }
    
    // initializes timer & display states
    const [timerValue, setTimerValue] = useState(() => {
        const range = getModeRange(selectedMode);
        return rangeAverageInt(range);
    });
    const [timerRange, setTimerRange] = useState(getModeRange(selectedMode));
    const [displayText, setText] = useState(convertToTime(timerValue));

    // sets new timer value state
    const handleTimerChange = (value) => {
        setTimerValue(value);
        updateMicrowaveDisplay(convertToTime(value));
    }

    // toggles door open/close state
    const handleDoorOpen = () => {
        setDoorOpen((lastDoorState) => !lastDoorState);
    }

    // sets new mode state, updates timer range and value
    const handleModeChange = (mode) => {
        setMode(mode);
        const range = getModeRange(mode);
        setTimerRange(range);
        setTimerValue(rangeAverageInt(range));
        updateMicrowaveDisplay(mode);
    }

    // sets text to microwave display
    const updateMicrowaveDisplay = (text) => {
        setText(text);
    };

    // sends image to be processed
	const handleProcessImage = async () => {
        if (microwaving) return;

        // door has to be closed
        if (isDoorOpen) return updateMicrowaveDisplay('Close door');

        // sends request if image is uploaded
		if (uploadedImage) {
			try {
                setMicrowaving(true);
                updateMicrowaveDisplay('Heating. . .');

				// send image and parameters
				const formData = new FormData();
				formData.append('image', uploadedImage);
				formData.append('mode', selectedMode);
				formData.append('intensity', timerValue);

				// request processed image from API
				const response = await fetch('http://localhost:3001/process-image', {
					method: 'POST',
					body: formData
				});

                // handles API response
				if (response.ok) {
					const processedImageBlob = await response.blob();
                    const timestamp = Date.now();
                    const processedImageFile = new File([processedImageBlob], `freshly_microwaved_${timestamp}.jpg`, {
                        type: 'image/jpeg',
                        lastModified: timestamp
                    });

                    setUploadedImage(processedImageFile);
                    updateMicrowaveDisplay('Ready');
                    console.log(processedImageFile);
				} else {
					// server errors
					console.error('Server error:', response.status, response.statusText);
                    updateMicrowaveDisplay('Error');
				}
			} catch (error) {
				// client errors
				console.error('Client error:', error.message);
                updateMicrowaveDisplay('Error');
			} finally {
                console.log('microwaved');
                setMicrowaving(false);
            }
		} else {
			console.log("No image");
            updateMicrowaveDisplay('No image');
		}
	};

    // fully functioning microwave
    return (
        <div className="microwave-frame">
            <div className="microwave">
                <Door 
                    isOpen={isDoorOpen} 
                    onOffToggle={handleDoorOpen}
                    insideElements={
                        <ImageUpload
                            onImageUpload={setUploadedImage}
                            processedImage={uploadedImage}
                        />
                    }
                    disabled={microwaving}
                ></Door>
                <div className="control-panel">
                    <Display
                        text={displayText}
                    ></Display>
                    <Mode
                        selectedMode={selectedMode}
                        onModeChange={handleModeChange}
                        disabled={microwaving}
                    ></Mode>
                    <Timer
                        minValue={timerRange.minValue}
                        maxValue={timerRange.maxValue}
                        timerValue={timerValue}
                        onTimerChange={handleTimerChange}
                        disabled={microwaving}
                    ></Timer>
                    <button className="start-button" onClick={handleProcessImage} disabled={microwaving}>Start</button>
                </div>
            </div>
        </div>
    );
};

export default Microwave;