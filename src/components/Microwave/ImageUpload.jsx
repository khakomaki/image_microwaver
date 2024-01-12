import { useState, useEffect } from "react";

const ImageUpload = ({ onImageUpload, processedImage }) => {
    const [image, setImage] = useState(null);

    // update state when processed image changes
    useEffect(() => {
        setImage(processedImage);
    }, [processedImage]);

    // changes currently selected image
    const handleChangeImage = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        onImageUpload(selectedImage);
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
            {image && (
                <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded image"
                    id="user-image"
                />
            )}
            <input type='file' onChange={handleChangeImage} accept="image/*" id="image-upload-input"/>
            <button onClick={handleDownloadImage} id="image-download-button">Download image</button>
        </div>
    );
};

export default ImageUpload;
