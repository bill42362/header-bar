// HeaderBarSubmenu.js
'use strict';
import React from 'react';

import '../css/header-bar-submenu.less';

class HeaderBarSubmenu extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { headerItems, bodyItems, footerItems, style } = this.props;
        return <div className='header-bar-submenu' style={style}>
            {!!headerItems.length && <div className='header-bar-submenu-header' >
                {headerItems.map((submenuItem, index) => {
                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                })}
            </div>}
            <div className='header-bar-submenu-body' >
                {bodyItems.map((submenuItem, index) => {
                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                })}
            </div>
            {!!footerItems.length && <div className='header-bar-submenu-footer' >
                {footerItems.map((submenuItem, index) => {
                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                })}
            </div>}
        </div>;
    }
}

module.exports = HeaderBarSubmenu;
