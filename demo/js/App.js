// App.js
'use strict'
import HeaderBar from '../../src/js/index.js';
import React from 'react';
import ReactDOM from 'react-dom';

var onReadyStateChange = function onReadyStateChange(e) {
    if(document.readyState == 'complete') {
        ReactDOM.render(
            <div className='header'>
                <HeaderBar
                    logo={{ src:'/img/logo.svg', title:'LOGO' }}
                    hamburger={{ src:'/img/hamburger.svg', title:'Menu' }}
                >
                    <a href='//media.pbplus.me' data-color='rgb(64, 124, 156)' data-match='media.pbplus.me'>運動專欄</a>
                    <a href='//localhost' data-color='rgb(226, 147, 192)' data-match='local(.*)'>圓夢</a>
                    <a href='//facebook.com' data-subnav={true} data-color='rgb(62, 86, 155)'><img src='/img/facebook.svg'/></a>
                    <a href='//youtube.com' data-subnav={true} data-color='rgb(229, 26, 0)'><img src='/img/youtube.svg'/></a>
                    <a href='//timeline.line.me' data-subnav={true} data-color='rgb(0, 181, 9)'><img src='/img/line.svg'/></a>
                </HeaderBar>
            </div>,
            document.getElementById('app-root')
        );
    }   
};
document.addEventListener('readystatechange', onReadyStateChange);
