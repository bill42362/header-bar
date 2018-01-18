// HeaderBarListSubmenu.js
'use strict';
import React from 'react';

import '../css/header-bar-list-submenu.less';

class HeaderBarListSubmenu extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { bodyItems, style } = this.props;
        return <div className='header-bar-list-submenu' style={style}>
            <div className='header-bar-list-submenu-body' >
                {bodyItems.map((submenuItem, index) => {
                    return <div className='header-bar-list-submenu-item' key={index}>{submenuItem}</div>;
                })}
            </div>
        </div>;
    }
}

module.exports = HeaderBarListSubmenu;
