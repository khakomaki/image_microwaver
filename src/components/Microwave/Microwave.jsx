import { useEffect, useState } from "react";
import modeOptions from "./modeOptions";
import Display from "./Display";
import Timer from "./Timer";
import Mode from "./Mode";
import Door from "./Door";
import ImageUpload from "./ImageUpload";
import { buttonPushSFX, doorCloseSFX, doorOpenSFX, dingSFX, microwaveHummingSFX, plateInsertSFX } from '../../sounds';

// API endpoint from .env
const IMAGE_PROCESSING_API = import.meta.env.VITE_IMAGE_PROCESSING_API || 'http://localhost:3001/process-image';

const MICROWAVING_WAIT_TIME = 10000; // 10s

const Microwave = () => {
    const [selectedMode, setMode] = useState('Normal');
    const [isDoorOpen, setDoorOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [microwaving, setMicrowaving] = useState(false);

    // plays microwave humming sound when microwave is on
    useEffect(() => {
        if (microwaving) {
            microwaveHummingSFX.play();
        } else {
            microwaveHummingSFX.pause();
            microwaveHummingSFX.currentTime = 0;
        }
    }, [microwaving]);

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
        setDoorOpen(!isDoorOpen);
        if (isDoorOpen) {
            doorCloseSFX.play();
        } else {
            doorOpenSFX.play();
        }
    }

    // sets new mode state, updates timer range and value
    const handleModeChange = (mode) => {
        buttonPushSFX.play();
        setMode(mode);
        const range = getModeRange(mode);
        setTimerRange(range);
        setTimerValue(rangeAverageInt(range));
        updateMicrowaveDisplay(mode);
    }

    // sets new image, plays sound effect
    const handleImageChange = (image) => {
        setUploadedImage(image);
        plateInsertSFX.play();
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
            let waitTime = MICROWAVING_WAIT_TIME;

			try {
                setMicrowaving(true);
                updateMicrowaveDisplay('Heating. . .');

				// send image and parameters
				const formData = new FormData();
				formData.append('image', uploadedImage);
				formData.append('mode', selectedMode);
				formData.append('intensity', timerValue);

                // for calculating processing time
                const processingStartTime = Date.now();

				// request processed image from API
				const response = await fetch(IMAGE_PROCESSING_API, {
					method: 'POST',
					body: formData
				});

                // processing time
                const processingTime = Date.now() - processingStartTime;

                // handles API response
				if (response.ok) {
					const processedImageBlob = await response.blob();
                    const timestamp = Date.now();
                    const processedImageFile = new File([processedImageBlob], uploadedImage.name, {
                        lastModified: timestamp
                    });

                    // wait time
                    waitTime = Math.max(0, waitTime - processingTime);
                    setTimeout(() => {
                        // updates image and variables
                        setUploadedImage(processedImageFile);
                        updateMicrowaveDisplay('Ready');
                        setMicrowaving(false);

                        // sfx & log
                        dingSFX.play();
                        console.log(processedImageFile);
                    }, waitTime);

				} else {
					// server errors
                    const errorResponse = await response.json();
					console.error('Server error:', response.status, errorResponse.error);
                    updateMicrowaveDisplay('Error');
                    setMicrowaving(false);
				}
			} catch (error) {
				// client errors
				console.error('Client error:', error.message);
                updateMicrowaveDisplay('Error');
                setMicrowaving(false);
			}
		} else {
			console.error("No image");
            updateMicrowaveDisplay('No image');
		}
	};

    // fully functioning microwave
    return (
        <div className={`microwave-frame ${microwaving ? 'microwaving' : ''}`}>
            <div className="microwave">
                <Door 
                    isOpen={isDoorOpen} 
                    onOffToggle={handleDoorOpen}
                    insideElements={
                        <ImageUpload
                            onImageUpload={handleImageChange}
                            processedImage={uploadedImage}
                        />
                    }
                    disabled={microwaving}
                />
                <div className="control-panel">
                    <Display
                        text={displayText}
                    />
                    <Mode
                        selectedMode={selectedMode}
                        onModeChange={handleModeChange}
                        disabled={microwaving}
                    />
                    <Timer
                        minValue={timerRange.minValue}
                        maxValue={timerRange.maxValue}
                        timerValue={timerValue}
                        onTimerChange={handleTimerChange}
                        disabled={microwaving}
                    />
                    <button className="start-button" onClick={handleProcessImage} disabled={microwaving}>Start</button>
                </div>
            </div>
        </div>
    );
};

export default Microwave;