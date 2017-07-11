// App.js
'use strict'
import HeaderBar from 'header-bar';
import React from 'react';
import ReactDOM from 'react-dom';

var onReadyStateChange = function onReadyStateChange(e) {
    if(document.readyState == 'complete') {
        ReactDOM.render(
            <div className='header'>
                <HeaderBar
                    logo={{ src:'/img/logo.svg', title:'LOGO' }}
                    hamburger={{ src:'/img/hamburger.svg', title:'Menu' }}
                    menuCloser={{ src:'/img/hamburger.svg', title:'Close menu' }}
                >
                    {[
                        <a key='0' href='//media.pbplus.me' data-color='rgb(64, 124, 156)' data-match='media.pbplus.me'>運動專欄</a>,
                        <a key='1' href='//localhost' data-childnav={true} >
                            <img src='https://d2z53ag52zrc0n.cloudfront.net/PBTV/media/pbplustv.png'/>pb+ 自製節目
                        </a>,
                        <a key='2' href='//localhost' data-childnav={true} >
                            <img src='https://d2z53ag52zrc0n.cloudfront.net/PBTV/media/cb.png'/>中信兄弟主場賽事
                        </a>,
                        <a key='2' href='//localhost' data-childnav={true} >富邦悍將主場賽事</a>,
                        <a key='3' href='//localhost' data-color='rgb(226, 147, 192)' data-match='local(.*)'>圓夢</a>,
                        <a key='4' href='//localhost' data-color='rgb(66, 169, 140)' data-match='ticket'>購票</a>
                    ]}
                    <a href='//facebook.com' data-subnav={true} data-color='rgb(62, 86, 155)'><img src='/img/facebook.svg'/></a>
                    <a href='//youtube.com' data-subnav={true} data-color='rgb(229, 26, 0)'><img src='/img/youtube.svg'/></a>
                    <a href='//timeline.line.me' data-subnav={true} data-color='rgb(0, 181, 9)'><img src='/img/line.svg'/></a>
                    <div data-submenu={true} ><a href='/login' title='login'>登入</a></div>
                </HeaderBar>
            </div>,
            document.getElementById('app-root')
        );
    }   
};
document.addEventListener('readystatechange', onReadyStateChange);
