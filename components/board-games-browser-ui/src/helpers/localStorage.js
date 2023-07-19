function createLocalStorage () {
  const LocalStorage = require('node-localstorage').LocalStorage
  const localStorage = new LocalStorage('./temp/localStorage')
  return localStorage
}

const ls = (typeof window !== 'undefined') ? window.localStorage : createLocalStorage()

export default ls
