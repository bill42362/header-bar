// index.js
'use strict';
import React from 'react';
import HeaderBarNavItem from './HeaderBarNavItem.js';
import HeaderBarSubnavItem from './HeaderBarSubnavItem.js';

const defaultProps = {
};

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { style, logo } = this.props;
        let { children } = this.props;
        if(!children.length) { children = [children]; }
        const navs = children.filter(child => { return !child.props['data-subnav']; });
        const subnavs = children.filter(child => { return child.props['data-subnav']; });
        return <div className='header-bar' style={style}>
            {!!logo && <img
                className={'header-bar-logo ' + logo.className}
                {...logo}
            ></img>}
            <nav className='header-bar-nav'>
                {navs.map((nav, index) => (<HeaderBarNavItem nav={nav} key={index} />))}
            </nav>
            <nav className='header-bar-subnav'>
                {subnavs.map((subnav, index) => (<HeaderBarSubnavItem nav={subnav} key={index} />))}
            </nav>
        </div>;
    }
}

module.exports = HeaderBar;
