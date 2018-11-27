// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Header from './../Header';
import TaskList from './../TasksList';
import Footer from './../Footer';

export default class Scheduler extends Component {
    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Header/>
                    <TaskList/>
                    <Footer/>
                </main>
            </section>
        );
    }
}
