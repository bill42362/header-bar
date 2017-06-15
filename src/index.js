// index.js
'use strict';
import React from 'react';

const defaultProps = {
};

const getChildComponent = (child, index) => {
    let itemStyle = {
        borderBottom: `3px solid ${child.props['data-color']}`,
    };
    const matchedLocation = location.href.match(child.props['data-match']);
    if(matchedLocation) { itemStyle.backgroundColor = child.props['data-color']; }
    let content = child;
    switch(child.type) {
        case 'a':
        default:
            break;
    }
    return <div className='header-bar-nav-item' key={index} style={itemStyle} >
        {content}
    </div>;
}

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
                {!children.length && getChildComponent(children)}
                {!!children.length && children.map(getChildComponent)}
            </nav>
        </div>;
    }
}

module.exports = HeaderBar;
