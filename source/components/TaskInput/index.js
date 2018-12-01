import React from "react";
import PropTypes from "prop-types";

class TaskInput extends React.Component {
    state = {
        message: "",
    };
    taskInput = React.createRef();

    static getDerivedStateFromProps (nextProps, prevState) {
        if (!prevState.message) {
            return { message: nextProps.message };
        }

        return null;
    }

    componentDidUpdate () {
        const { isEditing, message } = this.props;

        if (isEditing) {
            this.taskInput.current.focus();
        }
        if (!isEditing && this.state.message !== message) {
            this.setState({ message });
        }
    }

    _handleChange = (event) => {
        this.setState({
            message: event.target.value,
        });
    };

    _handleFocus = (event) => {
        const { value } = event.target;

        event.target.value = "";
        event.target.value = value;
    };

    _handleKeyDown = (event) => {
        const { key } = event;

        if (key == "Escape") {
            this.setState({
                message: this.props.message,
            });
            this.props.setEditingState(false);
        }
        if (key == "Enter") {
            this.props.editMessage(this.state.message);
            this.props.setEditingState(false);
        }
    };

    render () {
        return (
            <input
                disabled = { !this.props.isEditing }
                maxLength = '50'
                onChange = { this._handleChange }
                onFocus = { this._handleFocus }
                onKeyDown = { this._handleKeyDown }
                ref = { this.taskInput }
                type = 'text'
                value = { this.state.message }
            />
        );
    }
}

TaskInput.propTypes = {
    message:         PropTypes.string.isRequired,
    isEditing:       PropTypes.bool.isRequired,
    setEditingState: PropTypes.func.isRequired,
    editMessage:     PropTypes.func.isRequired,
};

export default TaskInput;
