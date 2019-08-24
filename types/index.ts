interface IResolutions {
  desktop?: string,
  tablet?: string,
  mobile?: string
}

interface IClasses {
  picture?: string,
  img?: string
}

interface IProps {
  alt?: string,
  type: string,
  path: string,
  name: string,
  pixelDensity?: number,
  extraResolutions?: IResolutions,
  classes?: IClasses
}

interface ISrcProps {
  name: string,
  path: string,
  layout?: string,
  type: string
}

interface ISrcCreator {
  name: ISrcProps['name'],
  path: ISrcProps['path'],
  type: ISrcProps['type'],
  layout?: ISrcProps['layout'],
  currentPixelDensity?: IProps['pixelDensity']
  srcWithPixelsPostfic?: boolean
}

interface ISrcIterator extends ISrcProps {
  pixelDensity?: IProps['pixelDensity'],
  isMain?: boolean
}

interface ISourceGenerator extends ISrcProps {
  isWebpSupported: boolean
  pixelDensity?: IProps['pixelDensity']
  mediaBreakpoint?: string
}

export {
  IProps,
  ISrcCreator,
  ISrcIterator,
  ISourceGenerator
}
