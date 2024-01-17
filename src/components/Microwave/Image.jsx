import React from "react";

// memoized uploaded image, updates only when necessary
const Image = React.memo(({ image }) => (
    <img src={URL.createObjectURL(image)} alt="Uploaded image" id="user-image" />
    ));

export default Image;