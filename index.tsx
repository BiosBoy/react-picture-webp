/**
*  @name react-picture
*  @author 3p-sviat
*  @version 1.0.0
*  @description creates <picture /> set with smart logic based on manual layout and browser webP images format support
*  @params config = {object} main configuration object
*  @params config.className = { picture: {string}, img: {string} } // non-required
*  @params config.alt = {string} // non-required
*  @params config.path = {string}
*  @params config.name = {string}
*  @params config.type = {string}
*  @params config.pixelDensity = {number}
*  @params config.extraResolutions = {object} // non-required, {key} - mediaType, {value} - mediaValue
*  
*  @returns valid React-based {html} markup <picture /> tag
*
*/

import React from 'react'

import { srcCreator, srcIterator, sourcesGenerator } from './helpers'

import { PIXELS_DENSITY_COUNT } from './constants'

import { IProps } from './types'

class Picture extends React.PureComponent<IProps, any> {
  static defaultProps: IProps = {
    alt: '',
    type: '',
    path: '',
    name: '',
    pixelDensity: PIXELS_DENSITY_COUNT,
    extraResolutions: {
      desktop: 'min-width: 1001px',
      tablet: 'max-width: 1000px',
      mobile: 'max-width: 600px'
    },
    classes: {
      picture: '',
      img: ''
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isWebpSupported: false
    }
  }

  componentDidMount() {
    this._checkWebpSupport()
  }

  _checkWebpSupport = () => {
    this.setState({
      isWebpSupported: window.__WEBPSUPPORT__ || document.body && document.body.classList.contains('webp-support')
    })
  }

  _sources = () => {
    const { isWebpSupported } = this.state
    const { name, path, type, pixelDensity, extraResolutions } = this.props

    const sourcesArr = []
    const responsiveSourcesArray = extraResolutions && Object.keys(extraResolutions) || []
    const configGenerator = (key: string) => ({
      name,
      path,
      pixelDensity,
      isWebpSupported,
      mediaBreakpoint: extraResolutions[key],
      layout: key,
      type
    })

    if (responsiveSourcesArray.length > 0) {
      responsiveSourcesArray.forEach(key => {
        const configuration = configGenerator(key)

        sourcesArr.push(sourcesGenerator(configuration))
      })
    } else {
      const configuration = configGenerator(responsiveSourcesArray[0])

      sourcesArr.push(sourcesGenerator(configuration))
    }

    return sourcesArr
  }

  _img = () => {
    const { classes, alt, name, path, type, pixelDensity } = this.props

    const mainSrcSet = () => srcIterator({ name, path, pixelDensity, type, isMain: true })
    const mainSrc = () => srcCreator({ name, path, type, srcWithPixelsPostfic: false })

    return (
      <img
        alt={alt}
        className={classes.img}
        src={mainSrc()}
        srcSet={mainSrcSet()}
      />
    )
  }

  render() {
    const { classes, path, name, type } = this.props

    if (!path || !name || !type) {
      console.error('REACT-PICTURE ERROR - YOUR MUST PROVIDE A NAM, PATH AND TYPE OF THE IMAGES FIRST!')
      return null
    }

    return (
      <picture className={classes.picture}>
        {this._sources()}
        {this._img()}
      </picture>
    )
  }
}

export default Picture
