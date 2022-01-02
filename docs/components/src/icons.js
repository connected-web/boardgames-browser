import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fas)

function icons () {
  const all = Object.keys(fas)
  const remapped = all.map(key => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLocaleLowerCase()
      .replace('fa-', '')
      .replace('xray', 'x-ray')
      .replace('hsquare', 'h-square')
      .replace('icursor', 'i-cursor')
      .replace('stopwatch20', 'stopwatch-20')
  }).filter(a => !['font-awesome-logo-full', 'ad'].includes(a))
  return remapped
}

export default icons