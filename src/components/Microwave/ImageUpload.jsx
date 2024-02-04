import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Image from './Image';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ImageUpload = ({ onImageUpload, processedImage }) => {
    const [image, setImage] = useState(null);

    // update state when processed image changes
    useEffect(() => {
        setImage(processedImage);
    }, [processedImage]);

    // changes currently selected image
    const handleChangeImage = (event) => {
        const selectedImage = event.target.files[0];

        // changes image if it doesn't exceed max file size, otherwise clears
        if (selectedImage.size <= MAX_FILE_SIZE) {
            setImage(selectedImage);
            onImageUpload(selectedImage);
        } else {
            event.target.value = "";
            setImage(null);
            onImageUpload(null);
        }
    }

    const handleDownloadImage = () => {
        if (image) {
            // download link
            const dlLink = document.createElement('a');
            dlLink.href = URL.createObjectURL(image);
            dlLink.download = image.name;

            // trigger immediately
            document.body.appendChild(dlLink);
            dlLink.click();
            document.body.removeChild(dlLink);
        }
    };

    return (
        <div className="image-upload" onClick={(e) => e.stopPropagation()}>
            {image && <Image image={image} />}
            <input 
                type='file' 
                onChange={handleChangeImage} 
                accept="image/*" 
                id="image-upload-input"
            />
            <button onClick={handleDownloadImage} id="image-download-button">Download image</button>
        </div>
    );
};

ImageUpload.propTypes = {
    onImageUpload: PropTypes.func.isRequired,
    processedImage: PropTypes.object
};

export default ImageUpload;
