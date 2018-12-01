// Core
import React from "react";
import PropTypes from "prop-types";

// Instruments
import taskTypes from "../../types/task";

// Components
import Task from "./../Task";

class TasksList extends React.PureComponent {
    render () {
        const {
            editTaskMessage,
            markAsCompleted,
            markAsFavorite,
            markAsUnCompleted,
            markAsNotFavorite,
            removeTask,
        } = this.props;

        return (
            <div>
                <ul>
                    {this.props.tasks.map((task) => (
                        <Task
                            key = { task.id }
                            { ...task }
                            editTaskMessage = { editTaskMessage }
                            markAsCompleted = { markAsCompleted }
                            markAsFavorite = { markAsFavorite }
                            markAsNotFavorite = { markAsNotFavorite }
                            markAsUnCompleted = { markAsUnCompleted }
                            removeTask = { removeTask }
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

TasksList.propTypes = {
    tasks:           PropTypes.arrayOf(PropTypes.shape(taskTypes)).isRequired,
    editTaskMessage: PropTypes.func.isRequired,
};

export default TasksList;
