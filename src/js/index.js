// index.js
'use strict';
import React from 'react';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import HeaderBarNavItem from './HeaderBarNavItem.js';
import HeaderBarSubnavItem from './HeaderBarSubnavItem.js';
import HeaderBarSubmenu from './HeaderBarSubmenu.js';
import HeaderBarListSubmenu from './HeaderBarListSubmenu.js';

import '../css/index.less';

const defaultProps = {
};

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false, isSubmenuOpen: false, submenuOpenKey: '', submenuRight: 0,
            shouldDisplaySmallStyle: false, isDisplayStyleUpdated: false,
            collapseMenuSubmenuHeight: 0, collapseMenuSubmenuId: Math.random(),
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openSubmenu = this.openSubmenu.bind(this);
        this.closeSubmenu = this.closeSubmenu.bind(this);
        this.closeSubmenuFromWrapper = this.closeSubmenuFromWrapper.bind(this);
        this.updateShouldDisplaySmallStyle = this.updateShouldDisplaySmallStyle.bind(this);
    }
    getSubmenuElement(element) {
        let resultElement = undefined, target = element;
        while(!resultElement && !!target) {
            resultElement = target.className.match('submenu-button') ? target : undefined;
            target = target.parentNode;
        }
        return resultElement;
    }
    openMenu() { this.setState({isMenuOpen: true}); }
    closeMenu() { this.setState({isMenuOpen: false}); }
    closeSubmenu(e) { this.setState({isSubmenuOpen: false}); }
    closeSubmenuFromWrapper(e) {
        const isWrapper = e.target.className.match('header-bar-submenu-wrapper');
        if(isWrapper) { this.closeSubmenu(); }
    }
    openSubmenu(e) {
        const buttonElement = this.getSubmenuElement(e.target);
        if(buttonElement) {
            const buttonRect = buttonElement.getBoundingClientRect();
            this.setState({
                isSubmenuOpen: true,
                submenuOpenKey: buttonElement.getAttribute('data-submenu_key'),
                submenuRight: window.innerWidth - buttonRect.right,
            });
        }
    }
    componentDidUpdate() {
        const { isSubmenuOpen, collapseMenuSubmenuHeight, collapseMenuSubmenuId } = this.state;
        const submenu = document.getElementById(collapseMenuSubmenuId);
        let resultHeight = 0;
        if(isSubmenuOpen && !!submenu) {
            const submenuRect = submenu.getBoundingClientRect();
            resultHeight = submenuRect.height;
        }
        if(1 < Math.abs(resultHeight - collapseMenuSubmenuHeight)) {
            this.setState({collapseMenuSubmenuHeight: resultHeight});
        }
    }
    updateShouldDisplaySmallStyle() {
        const NAV_MARGIN_RIGHT = 20;
        const navsWidth = this.navs.getBoundingClientRect().width;
        const navChildrenWidthSum = Array.prototype.filter.call(this.navs.children, nav => {
            return 'header-bar-nav-item' === nav.className;
        })
        .reduce((current, nav) => {
            const childWidth = nav.getBoundingClientRect().width + NAV_MARGIN_RIGHT;
            return current + childWidth;
        }, 0);
        if(navChildrenWidthSum > navsWidth && !this.state.shouldDisplaySmallStyle) {
            this.setState({shouldDisplaySmallStyle: true});
        }
        if(!this.state.isDisplayStyleUpdated) { this.setState({isDisplayStyleUpdated: true}); }
    }
    componentDidMount() {
        new ResizeSensor(this.navs, this.updateShouldDisplaySmallStyle);
        this.updateShouldDisplaySmallStyle();
    }
    render() {
        const { style, logo: propsLogo, hamburger, menuCloser } = this.props;
        const {
            isMenuOpen, isSubmenuOpen, submenuOpenKey, submenuRight,
            shouldDisplaySmallStyle, isDisplayStyleUpdated,
            collapseMenuSubmenuHeight, collapseMenuSubmenuId
        } = this.state;
        let { children } = this.props;
        if(!children.length) { children = [children]; }
        children = children.reduce((current, child) => {
            if(!child.length) { return [...current, child]; }
            else { return [...current, ...child]; }
        }, []);
        const childLogo = children.filter(child => { return child.props['data-logo']; })[0];
        const navs = children.filter(child => { return child.props['data-nav'] || child.props['data-childnav']; });
        const subnavs = children.filter(child => { return child.props['data-subnav']; });
        const buttons = children.filter(child => { return child.props['data-submenu_button'] || child.props['data-button']; });
        const submenuButttons = children.filter(child => { return child.props['data-submenu_button']; });
        const usingSubmenuButtton = submenuButttons.filter(button => submenuOpenKey === button.props['data-submenu_key'])[0];
        const submenuItems = children
            .filter(child => {
                return child.props['data-submenu_item'] && submenuOpenKey === child.props['data-submenu_key'];
            })
            .reduce((current, child) => {
                const position = child.props['data-submenu_position'] || 'body';
                current[position].push(child);
                return current;
            }, {header: [], body: [], footer: []});
        const smallHeaderBarClassName = shouldDisplaySmallStyle ? ' header-bar-small' : '';
        const navOpacityClassName = isDisplayStyleUpdated ? '' : ' header-bar-transparent';
        let submenu = undefined;
        if(!!usingSubmenuButtton) {
            if('list' === usingSubmenuButtton.props['data-submenu_type']) {
                submenu = <HeaderBarListSubmenu
                    headerItem={submenuItems.header[0]}
                    bodyItems={submenuItems.body}
                    style={{right: submenuRight}}
                />;
            } else {
                submenu = <HeaderBarSubmenu
                    headerItems={submenuItems.header}
                    bodyItems={submenuItems.body}
                    footerItems={submenuItems.footer}
                    style={{right: submenuRight}}
                />;
            }
        }
        return <div className={`header-bar${smallHeaderBarClassName}${navOpacityClassName}`} style={style}>
            {(propsLogo && !childLogo) && <img
                className={'header-bar-logo ' + propsLogo.className} {...propsLogo}
            ></img>}
            {!!childLogo && <div className='header-bar-logo'>{childLogo}</div>}
            <nav className='header-bar-nav' ref={navs => this.navs = navs}>
                {navs.filter(nav => !nav.props['data-childnav']).map((nav, index) => {
                    return <HeaderBarNavItem nav={nav} key={index} />;
                })}
            </nav>
            <nav className='header-bar-subnav'>
                {subnavs.map((subnav, index) => (<HeaderBarSubnavItem nav={subnav} key={index} />))}
            </nav>
            {buttons.map((button, index) => {
                if(button.props['data-button']) {
                    return <div className='header-bar-button' key={index} role='button' >{button}</div>;
                } else {
                    const submenuKey = button.props['data-submenu_key'];
                    const isOpenedSubmenu = isSubmenuOpen && submenuOpenKey === submenuKey;
                    return <div
                        className={`header-bar-submenu-button${isOpenedSubmenu ? ' header-bar-open' : ' header-bar-close'}`}
                        key={index} onClick={isOpenedSubmenu ? this.closeSubmenu : this.openSubmenu}
                        role='button' data-submenu_key={submenuKey}
                    >
                        {button}
                    </div>;
                }
            })}
            {isSubmenuOpen && <div className='header-bar-submenu-wrapper' onClick={this.closeSubmenuFromWrapper}>{submenu}</div>}
            <div className='header-bar-collapse'>
                <div className='header-bar-collapse-placeholder'></div>
                {buttons.map((button, index) => {
                    if(button.props['data-button']) {
                        return <div className='header-bar-collapse-button' key={index} role='button' >{button}</div>;
                    } else {
                        const submenuKey = button.props['data-submenu_key'];
                        const isOpenedSubmenu = isSubmenuOpen && submenuOpenKey === submenuKey;
                        return <div
                            className={`header-bar-collapse-submenu-button${isOpenedSubmenu ? ' header-bar-open' : ' header-bar-close'}`}
                            key={index} onClick={isOpenedSubmenu ? this.closeSubmenu : this.openSubmenu}
                            role='button' data-submenu_key={submenuKey}
                        >
                            {button}
                        </div>;
                    }
                })}
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
