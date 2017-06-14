// index.js
'use strict';
import React from 'react';

class HeaderBar extends React.Component {
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
