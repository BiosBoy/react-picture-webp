import React from 'react'

import {
  normalizedDensity,
  stringifySrcSet
} from '../utils'

import {
  WEBP_FORMAT,
  DESKTOP_LAYOUT,
  DESKTOP_PIXEL_DESTINY
} from '../constants'

import {
  ISrcCreator,
  ISrcIterator,
  ISourceGenerator
} from '../types'

const srcCreator = (srcProps: ISrcCreator) => {
  const {
    name,
    path,
    currentPixelDensity = DESKTOP_PIXEL_DESTINY,
    srcWithPixelsPostfic = true,
    layout = DESKTOP_LAYOUT,
    type = WEBP_FORMAT
  } = srcProps

  const src = `${path}${layout}/${name}@${currentPixelDensity}x.${type}`
  const srcWithPostfics = `${src} ${currentPixelDensity}x`

  return srcWithPixelsPostfic ? srcWithPostfics : src
}

const srcIterator = (srcProps: ISrcIterator) => {
  const {
    isMain = false,
    pixelDensity = DESKTOP_PIXEL_DESTINY,
    ...props
  } = srcProps

  const srcList = []
  const iterationArray = Array.from(Array(pixelDensity).keys())

  iterationArray.forEach(pixelDensity => {
    const mainRegularPixelDestiny = isMain && pixelDensity === 0

    if (mainRegularPixelDestiny) {
      return
    }

    srcList.push(srcCreator({ ...props, currentPixelDensity: normalizedDensity(pixelDensity) }))
  })

  return stringifySrcSet(srcList)
}

const sourcesGenerator = (sourceProps: ISourceGenerator) => {
  const { isWebpSupported, type, mediaBreakpoint, ...props } = sourceProps

  // returning webp image format if the browser can serve them or png/jpg/etc.
  const imageFormat = isWebpSupported ? WEBP_FORMAT : type 
  const layoutBreakpoint = mediaBreakpoint ? `(${mediaBreakpoint})` : ''
  const srcset = srcIterator({ ...props, type: imageFormat })

  return (
    <source
      key={layoutBreakpoint}
      type={`image/${imageFormat}`}
      media={layoutBreakpoint}
      srcSet={srcset}
    />
  )
}

export {
  srcCreator,
  srcIterator,
  sourcesGenerator
}
