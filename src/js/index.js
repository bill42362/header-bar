// index.js
'use strict';
import React from 'react';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import HeaderBarNavItem from './HeaderBarNavItem.js';
import HeaderBarSubnavItem from './HeaderBarSubnavItem.js';

import '../css/index.less';

const defaultProps = {
};

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false, isSubmenuOpen: false, submenuOpenKey: '',
            shouldDisplaySmallStyle: false, isDisplayStyleUpdated: false,
            collapseMenuSubmenuHeight: 0, collapseMenuSubmenuId: Math.random(),
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openSubmenu = this.openSubmenu.bind(this);
        this.closeSubmenu = this.closeSubmenu.bind(this);
        this.updateShouldDisplaySmallStyle = this.updateShouldDisplaySmallStyle.bind(this);
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
    openSubmenu(e) { this.setState({isSubmenuOpen: true, submenuOpenKey: this.getSubmenuKey(e.target)}); }
    closeSubmenu(e) { this.setState({isSubmenuOpen: false}); }
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
            isMenuOpen, isSubmenuOpen, submenuOpenKey,
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
        const submenuButttons = children.filter(child => { return child.props['data-submenu_button']; });
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
            {submenuButttons.map((submenuButtton, index) => {
                const submenuKey = submenuButtton.props['data-submenu_key'];
                const isOpenedSubmenu = isSubmenuOpen && submenuOpenKey === submenuKey;
                const shouldDisplaySubmenu = isOpenedSubmenu && 0 !== (
                    submenuItems['header'].length
                    + submenuItems['body'].length
                    + submenuItems['footer'].length
                );
                return <div className='header-bar-submenu-group' key={index}>
                    <div
                        className={`header-bar-submenu-button${isOpenedSubmenu ? ' open' : ' close'}`}
                        onClick={isOpenedSubmenu ? this.closeSubmenu : this.openSubmenu}
                        role='button' data-submenu_key={submenuKey}
                    >
                        {submenuButtton}
                    </div>
                    {shouldDisplaySubmenu && <div className='header-bar-submenu-wrapper'>
                        <div className='header-bar-submenu' >
                            {!!submenuItems['header'].length && <div className='header-bar-submenu-header' >
                                {submenuItems['header'].map((submenuItem, index) => {
                                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>}
                            <div className='header-bar-submenu-body' >
                                {submenuItems['body'].map((submenuItem, index) => {
                                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>
                            {!!submenuItems['footer'].length && <div className='header-bar-submenu-footer' >
                                {submenuItems['footer'].map((submenuItem, index) => {
                                    return <div className='header-bar-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>}
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
                        <div className='header-bar-collapse-menu-submenu-buttons'>
                            {submenuButttons.map((submenuButtton, index) => {
                                const submenuKey = submenuButtton.props['data-submenu_key'];
                                const isOpenedSubmenu = isSubmenuOpen && submenuOpenKey === submenuKey;
                                return <div
                                    className='header-bar-collapse-menu-submenu-button' key={index}
                                    onClick={isOpenedSubmenu ? this.closeSubmenu : this.openSubmenu}
                                    role='button' data-submenu_key={submenuKey}
                                >
                                    {submenuButtton}
                                </div>;
                            })}
                        </div>
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
                    <div className='header-bar-collapse-menu-submenu-wrapper' style={{height: collapseMenuSubmenuHeight}} >
                        <div className='header-bar-collapse-menu-submenu' id={collapseMenuSubmenuId} >
                            {!!submenuItems['header'].length && <div className='header-bar-collapse-menu-submenu-header' >
                                {submenuItems['header'].map((submenuItem, index) => {
                                    return <div className='header-bar-collapse-menu-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>}
                            <div className='header-bar-collapse-menu-submenu-body' >
                                {submenuItems['body'].map((submenuItem, index) => {
                                    return <div className='header-bar-collapse-menu-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>
                            {!!submenuItems['footer'].length && <div className='header-bar-collapse-menu-submenu-footer' >
                                {submenuItems['footer'].map((submenuItem, index) => {
                                    return <div className='header-bar-collapse-menu-submenu-item' key={index}>{submenuItem}</div>;
                                })}
                            </div>}
                        </div>
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
