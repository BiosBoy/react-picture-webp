/**
*  @name webpChecker
*  @author 3p-sviat
*  @version 1.0.0
*  @description provides functionality to check if
*               the browser has webP images support and insert
*               the corresponging body class as a result into. (react-apps version)
*
*  @params {object} config - configuration of the watcher
*  @params {boolean} config.disableGlobal - callback accepted
*  @params {boolean} config.injectBodyClass - callback accepted
*  @params {function} config.callback- callback accepted
*  @params {string} config.imgURL - image url to test webP support
*
*  @returns {function} - callback with {boolean} flag provided
*
*/

interface IWebP {
  imgURL: string
  callback: (status: boolean) => void
  injectBodyClass: boolean
  disableGlobal: boolean
}

function webPChecker(config: IWebP) {
  const { imgURL = '', callback = () => {}, injectBodyClass = false, disableGlobal = false } = config || {}

  const TEST_IMG = imgURL || 'https://www.gstatic.com/webp/gallery/1.webp'


  function injectBodyClassByWebStatus() { // injects class `webp-support` in the `body` tag
    if (!injectBodyClass) {
      return
    }

    const bodyNode = document && document.body

    bodyNode.classList.add('webp-support')
  }

  function addGlobalFlag(status: boolean) { // settings global variable for a whole using
    if (disableGlobal) {
      return
    }

    // @ts-ignore
    window.__WEBPSUPPORT__ = status
  }

  function notifySubscriber(status: boolean) { // return boolean for a provided callback
    if (!callback || typeof callback !== 'function') {
      return
    }

    callback && callback(status)
  }

  function detectWebpSupport() {
    const img = new Image()
    img.src = TEST_IMG

    img.onload = () => {
      const isWebpSupported = !!(img.height > 0 && img.width > 0)

      injectBodyClassByWebStatus()
      addGlobalFlag(true)
      notifySubscriber(isWebpSupported)
    }

    img.onerror = (e) => {
      addGlobalFlag(false)
      notifySubscriber(false)
      console.log('Some error is happen during webP support checking:', JSON.stringify(e))
    }
  }

  detectWebpSupport()
}

export default webPChecker
