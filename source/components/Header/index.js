import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.PureComponent{
    state = {
        value: '',
    };
    
    _handleChange = event => {
        const { value } = event.target;

        this.setState({value});
        this.props.setFilterValue(value)
    };

    render() {
        return (
            <header>
                <h1>Планировщик задач</h1>
                <input
                    onChange={this._handleChange}
                    placeholder="Поиск"
                    type="search"
                    value={this.state.text}
                />
            </header>
        )
    }
}

Header.propTypes = {
    setFilterValue: PropTypes.func.isRequired,
};

export default Header;
