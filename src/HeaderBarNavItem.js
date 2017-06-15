// HeaderBarNavItem.js
'use strict';
import React from 'react';

class HeaderBarNavItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { child } = this.props;
        const itemStyle = {
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
        return <div className='header-bar-nav-item' style={itemStyle} >
            {content}
        </div>;
    }
}

module.exports = HeaderBarNavItem;
