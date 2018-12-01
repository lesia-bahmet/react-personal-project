import React from "react";
import PropTypes from "prop-types";

import Checkbox from "./../../theme/assets/Checkbox";
import Styles from "./../Scheduler/styles.m.css";

class Footer extends React.PureComponent {
    _handleClick = () => {
        const { isAllTasksCompleted, markAllTasksAsCompleted } = this.props;

        if (isAllTasksCompleted) {
            return;
        }

        markAllTasksAsCompleted();
    };

    render () {
        return (
            <footer>
                <Checkbox
                    onClick = { this._handleClick }
                    checked = { this.props.isAllTasksCompleted }
                    color1 = '#000'
                    color2 = '#fff'
                />
                <span className = { Styles.completeAllTasks }>
                    Все задачи выполнены
                </span>
            </footer>
        );
    }
}

Footer.propTypes = {
    isAllTasksCompleted:     PropTypes.bool.isRequired,
    markAllTasksAsCompleted: PropTypes.func.isRequired,
};

export default Footer;
