export const setItem = (name, value) => {
  try {
    const item = JSON.stringify(value)
    localStorage.setItem(name, item)
  } catch (err) {
    return undefined
  }
}

export const getItem = name => {
  try {
    const item = localStorage.getItem(name)
    if (item === null) {
      return {}
    }
    return JSON.parse(item)
  } catch (err) {
    return undefined
  }
}

export const removeItem = name => {
  try {
    localStorage.removeItem(name)
  } catch (err) {
    return undefined
  }
}

export const loadState = () => {
  return getItem('ays-state')
}

export const saveState = (state) => {
  setItem('ays-state', state)
}
