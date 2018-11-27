// Core
import React from 'react';
import PropTypes from 'prop-types';

class TaskCreator extends React.Component {
    state = {
        message: this.defaultMessage,
    };
    defaultMessage = '';

    _handleClick = event => {
        event.preventDefault();

        this.props.addTask(this.state.message);
        this.setState({message: this.defaultMessage});
    };

    _handleChange = event => {
        this.setState({
            message: event.target.value,
        })
    };

    render(){
        const { message } = this.state;
        return (
            <form>
                <input
                    type="text"
                    placeholder="Описaние моей новой задачи"
                    maxLength="50"
                    value={message}
                    onChange={this._handleChange}
                />
                <button onClick={this._handleClick}>
                    Добавить задачу
                </button>
            </form>
        );
    }
}

TaskCreator.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default TaskCreator;
