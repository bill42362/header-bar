// index.js
'use strict';
import { Component } from 'react';

class HeaderBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;
        return <div className='header-bar'>
        </div>;
    }
}

module.exports = HeaderBar;
