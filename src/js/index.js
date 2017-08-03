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
        this.state = {isMenuOpen: false, submenuOpenKey: 'login'};
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openSubmenu = this.openSubmenu.bind(this);
        this.closeSubmenu = this.closeSubmenu.bind(this);
    }
    getSubmenuKey(element) {
        let key = undefined, target = element;
        while(!key && !!target) {
            key = target.getAttribute('data-submenu_key');
            target = target.parentNode;
        }
        return key;
    }
    openMenu() { this.setState({isMenuOpen: true}); }
    closeMenu() { this.setState({isMenuOpen: false}); }
    openSubmenu(e) { this.setState({submenuOpenKey: this.getSubmenuKey(e.target)}); }
    closeSubmenu(e) { this.setState({submenuOpenKey: ''}); }
    render() {
        const { style, logo: propsLogo, hamburger, menuCloser } = this.props;
        const { isMenuOpen, submenuOpenKey } = this.state;
        let { children } = this.props;
        if(!children.length) { children = [children]; }
        children = children.reduce((current, child) => {
            if(!child.length) { return [...current, child]; }
            else { return [...current, ...child]; }
        }, []);
        const childLogo = children.filter(child => { return child.props['data-logo']; })[0];
        const navs = children.filter(child => { return child.props['data-nav']; });
        const subnavs = children.filter(child => { return child.props['data-subnav']; });
        const submenuButttons = children.filter(child => { return child.props['data-submenu_button']; });
        return <div className='header-bar' style={style}>
            {(propsLogo && !childLogo) && <img
                className={'header-bar-logo ' + propsLogo.className} {...propsLogo}
            ></img>}
            {!!childLogo && <div className='header-bar-logo'>{childLogo}</div>}
            <nav className='header-bar-nav'>
                {navs.filter(nav => !nav.props['data-childnav']).map((nav, index) => {
                    return <HeaderBarNavItem nav={nav} key={index} />;
                })}
            </nav>
            <nav className='header-bar-subnav'>
                {subnavs.map((subnav, index) => (<HeaderBarSubnavItem nav={subnav} key={index} />))}
            </nav>
            {submenuButttons.map((submenuButtton, index) => {
                const submenuKey = submenuButtton.props['data-submenu_key'];
                const isSubmenuOpening = submenuOpenKey === submenuKey;
                const submenuItems = children.filter(child => {
                    return child.props['data-submenu_item'] && submenuKey === child.props['data-submenu_key'];
                });
                return <div
                    key={index}
                    className={`header-bar-submenu-button${isSubmenuOpening ? ' open' : ' close'}`}
                    onClick={isSubmenuOpening ? this.closeSubmenu : this.openSubmenu}
                    data-submenu_key={submenuKey}
                >
                    {submenuButtton}
                    {isSubmenuOpening && <div className='header-bar-submenu-wrapper'>
                        <div className='header-bar-submenu' >
                            <div className='header-bar-submenu-items'>
                                {submenuItems.map((submenuItem, index) => {
                                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>
                        </div>
                    </div>}
                </div>;
            })}
            <div className='header-bar-collapse'>
                <div className='header-bar-collapse-placeholder'></div>
                {!!hamburger && <img
                    {...hamburger}
                    className='header-bar-collapse-hamburger'
                    role='button' onClick={this.openMenu}
                />}
                {!hamburger && <div
                    className='header-bar-collapse-hamburger'
                    role='button' onClick={this.openMenu}
                >≡</div>}
            </div>
            {isMenuOpen && <div className='header-bar-collapse-menu-wrapper'>
                <div className='header-bar-collapse-menu-frame' role='button' onClick={this.closeMenu}></div>
                <div className='header-bar-collapse-menu'>
                    <div className='header-bar-collapse-menu-header'>
                        {!!submenuButtton && <div className='header-bar-collapse-menu-submenu-button'>
                            {submenuButtton}
                        </div>}
                        {!!menuCloser && <img
                            {...menuCloser}
                            className='header-bar-collapse-menu-closer'
                            role='button' onClick={this.closeMenu}
                        />}
                        {!menuCloser && <div
                            className='header-bar-collapse-menu-closer'
                            role='button' onClick={this.closeMenu}
                        >✖︎</div>}
                    </div>
                    <nav className='header-bar-collapse-menu-nav'>
                        {navs.map((nav, index) => {
                            if(nav.props['data-childnav']) {
                                return <div className='header-bar-collapse-childnav-item' key={index} >{nav}</div>;
                            } else {
                                return <div className='header-bar-collapse-nav-item' key={index} >
                                    <span
                                        className='header-bar-collapse-nav-item-left-bar'
                                        style={{backgroundColor: nav.props['data-color']}}
                                    ></span>
                                    {nav}
                                </div>;
                            }
                        })}
                    </nav>
                    <nav className='header-bar-collapse-menu-subnav'>
                        {subnavs.map((subnav, index) => {
                            return <div className='header-bar-collapse-subnav-item' key={index} >{subnav}</div>;
                        })}
                    </nav>
                </div>
            </div>}
        </div>;
    }
}

module.exports = HeaderBar;
