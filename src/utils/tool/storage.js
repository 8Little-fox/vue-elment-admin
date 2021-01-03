export function setItem(name, data) {
  if (typeof (data) === 'string') {
    return localStorage.setItem(name, data)
  } else {
    return localStorage.setItem(name, JSON.stringify(data))
  }
}

export function getItem(name) {
  return localStorage.getItem(name)
}

export function removeItem(name) {
  return localStorage.removeItem(name)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  return localStorage.removeItem('token')
}

export function setToken(token) {
  return localStorage.setItem('token', token)
}

export function clearAll() {
  return localStorage.clear()
}

// setItem 存储localStorage
// getItem 获取localStorage
// setToken 向缓存中存储token
// getToken 获取缓存中的token
// removeToken 删除缓存中的token
// removeItem 删除localStorage
// clearAll 删除全部缓存
