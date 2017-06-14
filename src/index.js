// index.js
'use strict';
import React from 'react';

const defaultProps = {
};

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { style, logo, children } = this.props;
        return <div className='header-bar' style={style}>
            {!!logo && <img
                className={'header-bar-logo ' + logo.className}
                {...logo}
            ></img>}
        </div>;
    }
}

module.exports = HeaderBar;
