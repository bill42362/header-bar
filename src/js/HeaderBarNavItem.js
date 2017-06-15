// HeaderBarNavItem.js
'use strict';
import React from 'react';

class HeaderBarNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isHovered: false};
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    onMouseEnter(e) { this.setState({isHovered: true}); }
    onMouseLeave(e) { this.setState({isHovered: false}); }
    render() {
        const { nav } = this.props;
        const { isHovered } = this.state;
        const itemStyle = {
            borderBottom: `3px solid ${nav.props['data-color']}`,
        };
        const matchedLocation = location.href.match(nav.props['data-match']);
        if(matchedLocation) { itemStyle.backgroundColor = nav.props['data-color']; }
        if(isHovered && !matchedLocation) { itemStyle.color = nav.props['data-color']; }
        let content = nav;
        switch(nav.type) {
            case 'a':
            default:
                break;
        }
        return <div
            className='header-bar-nav-item' style={itemStyle}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onFocus={this.onMouseEnter}
            onBlur={this.onMouseLeave}
        >{content}</div>;
    }
}

module.exports = HeaderBarNavItem;
