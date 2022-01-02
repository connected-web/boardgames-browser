function getParamsFromUrl(url) {
  const decodedUrl = decodeURI(url)
  if (typeof decodedUrl === 'string') {
    let paramStr = (decodedUrl.split('?')[1] || '').split('#')[0]
    let pairs = paramStr.split('&').map(kvp => kvp.split('='))
    let params = pairs.reduce((acc, [key, value]) => {
      if (key) {
        acc[key] = value
      }
      return acc
    }, {})
    return params
  }
}

export default getParamsFromUrl