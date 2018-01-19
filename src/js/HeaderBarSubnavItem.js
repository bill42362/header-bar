// HeaderBarSubnavItem.js
'use strict';
import React from 'react';
import '../css/header-bar-subnav-item.less';

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
        let content = nav;
        if(isHovered) {
            itemStyle.color = content.props['data-color'];
            if('img' === content.props.children.type) {
                content = React.cloneElement(
                    nav, undefined,
                    <img
                        {...content.props.children.props}
                        style={{backgroundColor: content.props['data-color']}}
                    >{content.props.children.props.children}</img>
                );
            }
        }
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
