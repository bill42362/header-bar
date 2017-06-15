// index.js
'use strict';
import React from 'react';
import HeaderBarNavItem from './HeaderBarNavItem.js';

const defaultProps = {
};

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { style, logo, children } = this.props;
        console.log('render() children:', children);
        return <div className='header-bar' style={style}>
            {!!logo && <img
                className={'header-bar-logo ' + logo.className}
                {...logo}
            ></img>}
            <nav className='header-bar-nav'>
                {!children.length && <HeaderBarNavItem child={children} index={0} />}
                {!!children.length && children.map((child, index) => (<HeaderBarNavItem child={child} key={index} />))}
            </nav>
        </div>;
    }
}

module.exports = HeaderBar;
