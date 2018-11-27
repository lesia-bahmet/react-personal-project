// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import taskTypes from '../../types/task';

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

    _handleRemoveClick = () => {
        const { id } = this.props;
        this.props.removeTask(id);
    };

    _handleFavoriteChange = () => {
        const { id } = this.props;

        this.props.favorite ?
            this.props.markAsNotFavorite(id) :
            this.props.markAsFavorite(id);
    };

    _handleCompleteChange = () => {
        const {id} = this.props;

        this.props.completed ?
            this.props.markAsUnCompleted(id):
            this.props.markAsCompleted(id);
    };

    render () {
        const { completed, favorite, message } = this._getTaskShape(...this.props);
        return (
            <li className = { Styles.task }>
                <div className={Styles.content}>
                    <div className={Styles.toggleTaskCompletedState}>
                        <Checkbox
                            onClick={this._handleCompleteChange}
                            checked={completed}
                            color1="#3b8ef3"
                            color2="#fff"/>
                    </div>
                    <input
                        disabled="true"
                        maxLength="50"
                        type="text"
                        value={message} />
                </div>
                <div className={Styles.actions}>
                    <Star
                        onClick={this._handleFavoriteChange}
                        checked={favorite}
                        className={Styles.toggleTaskFavoriteState}
                        inlineBlock
                    />
                    <Edit
                        className={Styles.updateTaskMessageOnClick}
                        inlineBlock
                    />
                    <Remove
                        onClick={this._handleRemoveClick}
                        inlineBlock
                    />
                </div>
            </li>
        );
    }
}

Task.propTypes = {
    ...taskTypes,
    markAsNotFavorite: PropTypes.func.isRequired,
    markAsFavorite: PropTypes.func.isRequired,
    markAsUnCompleted: PropTypes.func.isRequired,
    markAsCompleted: PropTypes.func.isRequired,
};
