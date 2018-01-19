// HeaderBarListSubmenu.js
'use strict';
import React from 'react';

import '../css/header-bar-list-submenu.less';
import CloseIcon from '../img/close_icon.png';

class HeaderBarListSubmenu extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { headerItem, bodyItems, style, close } = this.props;
        return <div className='header-bar-list-submenu' style={style}>
            <div className='header-bar-list-submenu-header' >
                <div className='header-bar-list-submenu-item' >{headerItem}</div>
                <img
                    className='header-bar-list-submenu-header-close-button'
                    src={CloseIcon} role='button' onClick={close}
                />
            </div>
            <div className='header-bar-list-submenu-body' >
                {bodyItems.map((submenuItem, index) => {
                    return <div className='header-bar-list-submenu-item' key={index}>{submenuItem}</div>;
                })}
            </div>
        </div>;
    }
}

module.exports = HeaderBarListSubmenu;
