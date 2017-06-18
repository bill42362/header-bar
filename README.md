# header-bar
Basic header bar with RWD.

### Installation
```bash
npm install --save-dev header-bar
```
### Usage
```js
import React from 'react';
import HeaderBar from 'header-bar';

class App extends React.Component {
    return <div className='app'>
        <HeaderBar
          logo={{ src:'/img/logo.svg', title:'LOGO' }}
          hamburger={{ src:'/img/hamburger.svg', title:'Menu' }}
        >
            <a href='//nav.link.href' data-color='rgb(64, 124, 156)' data-match='nav.link.href'>nav-link-1</a>
            <a href='//localhost' data-color='goldenrod' data-match='local(.*)'>nav-link-2</a>
            <a href='//facebook.com' data-subnav={true} data-color='rgb(62, 86, 155)'><img src='/img/facebook.svg'/></a>
            <a href='//sub.nav.link' data-subnav={true} data-color='rgb(229, 26, 0)'>sub-nav-link</a>
        </HeaderBar>
    </div>;
}

```

### Demo
```bash
cd node_module/header-bar/demo
npm install
npm start
```
Open demo page on *http://localhost:3000*
