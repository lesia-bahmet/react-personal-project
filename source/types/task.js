import PropTypes from "prop-types";

const taskTypes = {
    message:   PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    favorite:  PropTypes.bool.isRequired,
};

export default taskTypes;
