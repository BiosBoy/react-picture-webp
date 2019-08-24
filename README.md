# React-Picture

 [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=See&url=https://github.com/BiosBoy/react-picture&via=svyat770&hashtags=js,jsx,webp,react-picture,picture,images,html,css)

### Serve any images' retina set with easy by `react-picture` (Intelligent `webP` support included)!

[![npm](https://badgen.net/npm/v/react-picture)](https://www.npmjs.com/package/react-picture) [![Price](https://img.shields.io/badge/price-FREE-purple.svg)](https://github.com/BiosBoy/react-picture/blob/master/LICENSE) [![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/BiosBoy/react-picture/blob/master/LICENSE) [![GitHub package version](https://img.shields.io/badge/version-1.1.3-green.svg)](https://github.com/BiosBoy/react-picture) ![](https://img.badgesize.io/biosboy/react-picture/master/index.js.svg)

![logo_image](https://raw.githubusercontent.com/BiosBoy/react-picture/master/react-picture_logo.jpg)

**How to use:**
  - Prepare:
   Install `react-picture` as a regular `node_modules` package via:
   ```
     npm i react-picture
   ```
   or yarn:
   ```
     yarn add react-picture
   ```
**WebP Important Notice!** - to serve webP images via `react-picture` you need to install `webp-checker` package via `npm i web-checker` or `yarn add webp-checker`. And then run it as soon as possible inside the very first component/module that has an interaction with the whole DOM. (more details here: https://github.com/BiosBoy/webp-checker/readme.md)

**Quick Start:**

   - You can start using `react-picture` with just `name`, `path` and `type` fields providing. Only one important notice about folder structure. As this package works with the varios layouts (mobile, tablet, desktop, ect.), you need to put your images consistently by its folders. For example:
   ```
    root ---|
            | images ---| // or some particupar image folder
                        | desktop --- |
                                      | landscape@1x.png
                                      | landscape@2x.png
                                      | landscape@1x.webp // Tip: you can avoid webp format if needed.
                                      | landscape@2x.webp
                        | tablet  --- |
                                      | landscape@1x.png
                                      | landscape@2x.png
                                      | landscape@1x.webp
                                      | landscape@2x.webp
                        | mobile  --- |
                                      | landscape@1x.png
                                      | landscape@2x.png
                                      | landscape@1x.webp
                                      | landscape@2x.webp
                        | any etc --- | // some other folder with custom resolutions
   ```

   This is only one strict requirement while using this package. Probably it would be improved in future, but for not it's the only one way to easily serve various images resolutions inside one `<picture />`.

   So, if your image's folder structure looks like above, you can go ahead and start using this awesome package! 
   
  -- Example:
  ```
    // ...some logic
    import Picture from 'react-picture'

    class App extends React.Component {
      // ...some logic
    
      render() {
        return (
          <// ..some view start>
            <Picture name='landscape' path='root/images/' pixelDensity={2} type='png' />
          <// ..some view end>
        )
      }
    }
  ```

**Advanced:**
  - In case when you need to set up a better custom config you can throw props as object.

  -- Example:
  ```
    import Picture from 'react-picture' // import it;

    const config = {
      alt: 'alt_text', // basic alt text for `img` tag describing
      type: 'png', // type of the image provided
      path: 'root/images/', // path to your image (**important:** do not add path here with resolutions' paths including)
      name: 'landscape', // image name
      pixelDensity: 4, // count of the images densinity
      extraResolutions: { // resolutions to layout. By default `react-picture` will serve all these three image resolutions
        desktop: 'min-width: 1001px',
        tablet: 'max-width: 1000px',
        mobile: 'max-width: 600px'
      },
      classes: { // some classes for providing CSS control for your `<picture />`
        picture: 'some_class',
        img: 'some_class'
      }
    }
    
    return (
      <Picture {...config} />
    ); // run picture
  ```
