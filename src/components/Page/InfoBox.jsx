import PropTypes from 'prop-types';

const InfoBox = ({ title, text, images }) => {
    return (
        <div className="info-box">
            <h2 className="info-box-title">{title}</h2>
            <p>{text}</p>
            <div className="info-box-images">
                {images.map((image, index) => (
                    <div key={index} className="image-text-combo">
                        <p className="info-box-image-text">{image.imageText}</p>
                        <img className="info-box-image" src={image.url} alt={`Example image of effect ${title}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

InfoBox.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
};

export default InfoBox;