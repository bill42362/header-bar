# header-bar
Basic header bar with RWD.

### Installation
```bash
npm install --save-dev header-bar
```
### Usage
#### Javascript
```js
import React from 'react';
import HeaderBar from 'header-bar';

class App extends React.Component {
    return <div className='app'>
        <HeaderBar
          hamburger={{ src:'/img/hamburger.svg', title:'Menu' }}
        >
            <a href='//localhost' data-logo={true}><img src='/img/logo.svg' title='logo'/></a>
            <a href='//nav.link.href' data-nav={true} data-color='rgb(64, 124, 156)' data-match='nav.link.href'>nav-link-1</a>
            <a href='//localhost' data-nav={true} data-color='goldenrod' data-match='local(.*)'>nav-link-2</a>
            <a href='//facebook.com' data-subnav={true} data-color='rgb(62, 86, 155)'><img src='/img/facebook.svg'/></a>
            <a href='//sub.nav.link' data-subnav={true} data-color='rgb(229, 26, 0)'>sub-nav-link</a>
            <div data-submenu={true} ><a href='/login' title='login'>登入</a></div>
        </HeaderBar>
    </div>;
}
```
#### LESS
```less
@import (inline) '../node_modules/header-bar/lib/css/index.css';
```

### Demo
```bash
cd node_module/header-bar/demo
npm install
npm start
```
Open demo page on *http://localhost:3000*
