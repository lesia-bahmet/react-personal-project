import React from 'react';

class Header extends React.PureComponent{
    render() {
        return (
            <header>
                <h1>Планировщик задач</h1>
                <input placeholder="Поиск" type="search" value="" />
            </header>
        )
    }
}

export default Header;
