function getParamsFromUrl (url: string): Record<string, string> | undefined {
  const decodedUrl = decodeURI(url)
  if (typeof decodedUrl === 'string') {
    const paramStr = (decodedUrl.split('?')[1] ?? '').split('#')[0]
    const pairs = paramStr.split('&').map(kvp => kvp.split('='))
    const params = pairs.reduce<Record<string, string>>((acc, [key, value]) => {
      if (key !== undefined) {
        acc[key] = value
      }
      return acc
    }, {})
    return params
  }
  return undefined
}

export default getParamsFromUrl
