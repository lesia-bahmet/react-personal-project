// Core
import React from "react";
import PropTypes from "prop-types";

class TaskCreator extends React.Component {
    state = {
        message: this.defaultMessage,
    };
    defaultMessage = "";

    _handleClick = (event) => {
        event.preventDefault();

        this.props.addTask(this.state.message);
        this.setState({ message: this.defaultMessage });
    };

    _handleChange = (event) => {
        this.setState({
            message: event.target.value,
        });
    };

    render () {
        const { message } = this.state;

        return (
            <form>
                <input
                    maxLength = '50'
                    onChange = { this._handleChange }
                    placeholder = 'Описaние моей новой задачи'
                    type = 'text'
                    value = { message }
                />
                <button onClick = { this._handleClick }>Добавить задачу</button>
            </form>
        );
    }
}

TaskCreator.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default TaskCreator;
