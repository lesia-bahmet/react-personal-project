// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { BaseTaskModel, sortTasksByGroup } from '../../instruments';

// Components
import Header from './../Header';
import TaskList from './../TasksList';
import TaskCreator from './../TaskCreator';
import Footer from './../Footer';

export default class Scheduler extends Component {
    state = {
        tasks: [],
    };

    componentDidMount(){
        api.fetchTasks()
            .then(tasks => this.setState({ tasks }));
    }

    _addTask = (message = '') => {
        if(!message.length) return;

        api.createTask(message)
            .then( task => this.setState(prevState => ({
                tasks: [ task, ...prevState.tasks ]
            })));
    };

    _modifyTask = (id, field, value) => {
        if(!id || !field || value === undefined) return;

        const task = this.state.tasks.find(task => task.id === id);

        api.updateTask({...task, [field]: value})
            .then(([updatedTask]) => this.setState({
                tasks: this.state.tasks.map(task =>
                    task.id === id ? updatedTask : task
                ),
            }));
    };

    _editTaskMessage = (id, message = '') => {
        if(!message.length) return;

        this._modifyTask(id, 'message', message);
    };

    _markAsCompleted = id => {
        this._modifyTask(id, 'completed', true);
    };

    _markAsFavorite = id => {
        this._modifyTask(id, 'favorite', true);
    };

    _markAsUnCompleted = id => {
        this._modifyTask(id, 'completed', false);
    };

    _markAsNotFavorite = id => {
        this._modifyTask(id, 'favorite', false);
    };

    _removeTask = id => {
        if(!id) return;

        api.removeTask(id)
            .then(()=>{
                this.setState((prevState) => ({
                    tasks: [...prevState.tasks.filter(task => task.id !== id)]
                }));
            });
    };
    
    _markAllTasksAsCompleted = () => {
        api.completeAllTasks(this.state.tasks.map(task => ({
            ...task, ['completed']: true,
        }))).then((tasks) => this.setState({tasks: tasks}));
    };

    _isAllTasksCompleted = () => !this.state.tasks.find(task => !task.completed);

    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Header/>
                    <section>
                        <TaskCreator addTask={this._addTask} />
                        <TaskList
                            tasks={sortTasksByGroup(this.state.tasks)}
                            editTaskMessage={this._editTaskMessage}
                            markAsCompleted={this._markAsCompleted}
                            markAsFavorite={this._markAsFavorite}
                            markAsUnCompleted={this._markAsUnCompleted}
                            markAsNotFavorite={this._markAsNotFavorite}
                            removeTask={this._removeTask}
                        />
                    </section>
                    <Footer
                        isAllTasksCompleted={this._isAllTasksCompleted()}
                        markAllTasksAsCompleted={this._markAllTasksAsCompleted}
                    />
                </main>
            </section>
        );
    }
}
