# React-Picture

 [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=See&url=https://github.com/BiosBoy/react-picture&via=svyat770&hashtags=js,jsx,webp,react-picture,picture,images,html,css)

### The easist way to check webp support in any browser!

[![npm](https://badgen.net/npm/v/react-picture)](https://www.npmjs.com/package/react-picture) [![Price](https://img.shields.io/badge/price-FREE-purple.svg)](https://github.com/BiosBoy/react-picture/blob/master/LICENSE) [![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/BiosBoy/react-picture/blob/master/LICENSE) [![GitHub package version](https://img.shields.io/badge/version-1.1.3-green.svg)](https://github.com/BiosBoy/react-picture) ![](https://img.badgesize.io/biosboy/react-picture/master/index.js.svg)

  

![logo_image](https://raw.githubusercontent.com/BiosBoy/react-picture/master/web-checker_logo.jpg)

**How to use:**
  - Prepare:
   Install `react-picture` as a regular `node_modules` package via:
   ```
     npm i web-checker
   ```
   or yarn:
   ```
     yarn add web-checker
   ```
**Important!** - you need to run `react-picture` as soon as possible inside the very first component/module that has an interaction with the whole DOM. For example in `create-react-app` you probably should run the below script example in the `componentDidMount()` method of the root App.js component (or if you're using `Redux` state managment inside its `initialState.js`).

**Quick Start:**

   - So, to understand if your browser has webP support or not, basically, you need just run `webpChecker`. 
   After function running you will get a `window` variable `__WEBPSUPPORT__` (e.g. `window.__WEBPSUPPORT__`) with boolean value that shows if the webp support is `true/false`. 
   
  -- Example for React usage:
  ```
    // ...some logic
    import webpChecker from 'react-picture' // import it;

    class App extends React.Component {
     // ...some logic
     
     componentDidMount() {
         webpChecker(); // run checker
    
         window.__WEBSUPPORT__ // get notified about browser webp support by this global variable
     }
     
     // ...some logic
    }
  ```
  
  -- Example basic:
  ```
     import webpChecker from 'react-picture' // import it;

     webpChecker(); // run checker
    
     window.__WEBSUPPORT__ // get notified about browser webp support by this global variable
  ```

**Advanced:**
  - In case when you need to set up a better custom config you can throw props as:
```
  import webpChecker from 'react-picture' // import it;

  const config = {
    imgURL: 'imgSrc', // your_webp_image_src, by default used google static image
    disableGlobal: true, // disable global injection in 'window' object, by default 'false'
    injectBodyClass: false, // explicitly set a 'body' class 'webp-support', by default 'true',
    callback: status => status // some callback that you want to return with webp checker result 'true/false'
  }
  
  webpChecker(config); // run checker
```
