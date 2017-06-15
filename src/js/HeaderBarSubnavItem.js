// HeaderBarSubnavItem.js
'use strict';
import React from 'react';

class HeaderBarSubnavItem extends React.Component {
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
        };
        if(isHovered) { itemStyle.color = nav.props['data-color']; }
        let content = nav;
        return <div
            className='header-bar-subnav-item' style={itemStyle}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onFocus={this.onMouseEnter}
            onBlur={this.onMouseLeave}
        >{content}</div>;
    }
}

module.exports = HeaderBarSubnavItem;
