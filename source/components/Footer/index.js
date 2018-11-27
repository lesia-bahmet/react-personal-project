import React from 'react';

import Checkbox from './../../theme/assets/Checkbox';
import Styles from './../Scheduler/styles.m.css';

class Footer extends React.PureComponent {
    render(){
        return (
            <footer>
                <Checkbox color1="#000" color2="#fff"/>
                <span className={Styles.completeAllTasks}>Все задачи выполнены</span>
            </footer>
        );
    }
}

export default Footer;
