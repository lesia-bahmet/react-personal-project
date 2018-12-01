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
import Spinner from './../Spinner';

export default class Scheduler extends Component {
    state = {
        tasks: [],
        filterValue: '',
        fetching: false,
    };

    componentDidMount(){
        this.setState({fetching: true});
        api.fetchTasks()
            .then(tasks => this._updateAfterApiCall(tasks));
    }

    _updateAfterApiCall = tasks => {
        this.setState({
            tasks,
            fetching: false,
        });
    };

    _addTask = (message = '') => {
        if(!message.length) return;

        this.setState({fetching: true});
        const { tasks } = this.state;
        api.createTask(message)
            .then( task => this._updateAfterApiCall([ task, ...tasks ]));
    };

    _modifyTask = (id, field, value) => {
        if(!id || !field || value === undefined) return;

        const task = this.state.tasks.find(task => task.id === id);

        this.setState({fetching: true});
        api.updateTask({...task, [field]: value})
            .then(([updatedTask]) => this._updateAfterApiCall(
                this.state.tasks.map(task => task.id === id ? updatedTask : task
            )));
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

        this.setState({fetching: true});
        const { tasks } = this.state;
        api.removeTask(id)
            .then(()=>{
                this._updateAfterApiCall([...tasks.filter(task => task.id !== id)])
            });
    };
    
    _markAllTasksAsCompleted = () => {
        this.setState({fetching: true});
        api.completeAllTasks(this.state.tasks.map(task => ({
            ...task, ['completed']: true,
        }))).then((tasks) => this._updateAfterApiCall(tasks));
    };

    _isAllTasksCompleted = () => !this.state.tasks.find(task => !task.completed);

    _filterTasks = () => {
        const { filterValue, tasks } = this.state;

        return sortTasksByGroup(
            filterValue.length ?
            tasks.filter(task => task.message.includes(filterValue)) :
            tasks
        );
    };
    
    _setFilterValue = value => {
        this.setState({filterValue: value});
    };

    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    {this.state.fetching ? <Spinner/> : null}
                    <Header
                        setFilterValue={this._setFilterValue}
                    />
                    <section>
                        <TaskCreator addTask={this._addTask} />
                        <TaskList
                            tasks={this._filterTasks()}
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
