import axios from 'axios'
import md5 from 'md5'
import localStorage from './localStorage'

const cache = {}

async function getDataFrom (url) {
  const update = getDataFromRemote(url)
  const local = await getDataFromLocal(url)
  return local || update
}

async function getDataFromRemote (url) {
  const { data } = await axios.get(url)
  const hash = md5(url)
  localStorage.setItem(hash, JSON.stringify(data))
  return data
}

async function getDataFromLocal (url) {
  const hash = md5(url)
  const json = localStorage.getItem(hash)
  let data
  try {
    data = JSON.parse(json)
  } catch (ex) {
    data = false
  }
  return data
}

async function create (url) {
  const model = getDataFrom(url)
  cache[url] = model
  return model
}

const modelCache = {
  get (url) {
    const source = cache[url] || create(url)
    return Promise.resolve(source)
  }
}

export default modelCache
