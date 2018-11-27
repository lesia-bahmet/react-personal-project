// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { BaseTaskModel } from '../../instruments';

// Components
import Header from './../Header';
import TaskList from './../TasksList';
import TaskCreator from './../TaskCreator';
import Footer from './../Footer';

export default class Scheduler extends Component {
    state = {
        tasks: [],
    };

    _addTask = (message = '') => {
        if(!message.length) return;

        this.setState(prevState => ({
            tasks: [
                Object.assign(new BaseTaskModel(), { message }),
                ...prevState.tasks
            ]
        }));

        setTimeout(()=>this.state.task, 0);
    };

    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Header/>
                    <section>
                        <TaskCreator addTask={this._addTask} />
                        <TaskList tasks={this.state.tasks} />
                    </section>
                    <Footer/>
                </main>
            </section>
        );
    }
}
