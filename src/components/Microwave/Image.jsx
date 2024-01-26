import React from "react";
import PropTypes from 'prop-types';

// memoized uploaded image, updates only when necessary
const Image = React.memo(({ image }) => (
    <img src={URL.createObjectURL(image)} alt="Uploaded image" id="user-image" />
    ));

Image.displayName = 'Image';
Image.propTypes = {
    image: PropTypes.object.isRequired
};

export default Image;