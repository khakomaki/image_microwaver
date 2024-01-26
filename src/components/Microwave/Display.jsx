import PropTypes from 'prop-types';

const Display = ({ text }) => {
    return (
        <div className="display">
            <p>{text}</p>
        </div>
    );
};

Display.propTypes = {
    text: PropTypes.string.isRequired
};

export default Display;