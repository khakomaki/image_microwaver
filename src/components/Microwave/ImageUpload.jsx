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

    return (
        <div className="image-upload" onClick={(e) => e.stopPropagation()}>
            {image && (
                <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded image"
                    id="user-image"
                />
            )}
            <input type='file' onChange={handleChangeImage} accept="image/*"/>
        </div>
    );
};

export default ImageUpload;
