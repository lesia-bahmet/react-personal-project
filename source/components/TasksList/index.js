import React from 'react';

import Task from './../Task';

class TasksList extends React.PureComponent{
    render(){
        return (
            <section>
                <form>
                    <input maxLength="50" placeholder="Описaние моей новой задачи" type="text" value="" />
                    <button>Добавить задачу</button>
                </form>
                <div>
                    <ul>
                        <Task/>
                    </ul>
                </div>
            </section>
        );
    }
}

export default TasksList;
