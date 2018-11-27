// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';
import InitStyles from '../../theme/init.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        const { id, completed, favorite, message } = this._getTaskShape(this.props);
        return (
            <li className = { Styles.task }>
                <div className={Styles.content}>
                    <div className={Styles.toggleTaskCompletedState}>
                        <Checkbox checked={completed} color1="#3b8ef3" color2="#fff"/>
                    </div>
                    <input disabled="true" maxlength="50" type="text" value="asdasd" />
                </div>
                <div className={Styles.actions}>
                    <Star className={Styles.toggleTaskFavoriteState} inlineBlock />
                    <Edit className={Styles.updateTaskMessageOnClick} inlineBlock />
                    <Remove inlineBlock />
                </div>
            </li>
        );
    }
}
