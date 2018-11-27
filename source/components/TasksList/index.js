// Core
import React from 'react';
import PropTypes from 'prop-types';

// Instruments
import taskTypes from '../../types/task';

// Components
import Task from './../Task';

class TasksList extends React.PureComponent{
    render(){
        return (
            <div>
                <ul>
                    {this.props.tasks.map((task) => <Task {...task} />)}
                </ul>
            </div>
        );
    }
}

TasksList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape(taskTypes)).isRequired
};

export default TasksList;
