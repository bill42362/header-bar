// App.js
'use strict'
import HeaderBar from '../../src/index.js';
import React from 'react';
import ReactDOM from 'react-dom';

var onReadyStateChange = function onReadyStateChange(e) {
    if(document.readyState == 'complete') {
        ReactDOM.render(
            <div className='header'>
                <HeaderBar
                    logo={{ src:'/img/logo.svg', title:'LOGO' }}
                >
                    <a href='//media.pbplus.me' data-color='mistyrose' data-match='media.pbplus.me'>運動專欄</a>
                    <a href='//localhost' data-color='skyblue' data-match='local(.*)'>圓夢</a>
                </HeaderBar>
            </div>,
            document.getElementById('app-root')
        );
    }   
};
document.addEventListener('readystatechange', onReadyStateChange);
