// App.js
'use strict'
// import HeaderBar from 'header-bar';
import HeaderBar from '../../../../src/js/index.js';
import React from 'react';
import ReactDOM from 'react-dom';

var onReadyStateChange = function onReadyStateChange(e) {
    if(document.readyState == 'complete') {
        ReactDOM.render(
            <div className='header'>
                <HeaderBar
                    hamburger={{ src:'/img/hamburger.svg', title:'Menu' }}
                    menuCloser={{ src:'/img/hamburger.svg', title:'Close menu' }}
                >
                    <a href='//tw.pbplus.me' data-logo={true}><img src='/img/logo.svg' title='Home'/></a>
                    {[
                        <a
                            key='0' href='//media.pbplus.me'
                            data-nav={true} data-color='rgb(64, 124, 156)' data-match='media.pbplus.me'
                        >運動專欄</a>,
                        <a key='1' href='//localhost' data-childnav={true} >
                            <img src='https://d2z53ag52zrc0n.cloudfront.net/PBTV/media/pbplustv.png'/>pb+ 自製節目
                        </a>,
                        <a key='2' href='//localhost' data-childnav={true} >
                            <img src='https://d2z53ag52zrc0n.cloudfront.net/PBTV/media/cb.png'/>中信兄弟主場賽事
                        </a>,
                        <a key='2' href='//localhost' data-childnav={true} >富邦悍將主場賽事</a>,
                        <a key='3' href='//localhost' data-nav={true} data-color='rgb(226, 147, 192)' data-match='local(.*)'>圓夢</a>,
                        <a key='4' href='//localhost' data-nav={true} data-color='rgb(66, 169, 140)' data-match='ticket'>購票</a>
                    ]}
                    <a href='//facebook.com' data-subnav={true} data-color='rgb(62, 86, 155)'><img src='/img/facebook.svg'/></a>
                    <a href='//youtube.com' data-subnav={true} data-color='rgb(229, 26, 0)'><img src='/img/youtube.svg'/></a>
                    <a href='//timeline.line.me' data-subnav={true} data-color='rgb(0, 181, 9)'><img src='/img/line.svg'/></a>
                    <div data-submenu_button={true} data-submenu_key='login'>
                        <img src='/img/line.svg' style={{height: '1.8em', borderRadius: '0.9em'}} />
                        <span title='login'>Bill</span>
                    </div>
                    <div data-submenu_button={true} data-submenu_key='logpeople'><span title='logpeople'>紀錄</span></div>
                    <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='header'>
                        <div style={{color: 'rgb(24, 155, 202)'}}>VIP會員</div>
                    </div>
                    <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='body'>
                        <a href='/user-info' title='User Info'>修改個人資訊</a>
                    </div>
                    <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='body'>
                        <a href='/change-password' title='User Info'>更改密碼</a>
                    </div>
                    <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='footer'>
                        <a href='/logout' title='Logout'>登出</a>
                    </div>
                    <div data-submenu_item={true} data-submenu_key='logpeople'>
                        <a href='/pay-history' title='Pay History'>購買紀錄</a>
                    </div>
                </HeaderBar>
            </div>,
            document.getElementById('app-root')
        );
    }   
};
document.addEventListener('readystatechange', onReadyStateChange);
