const storage = {
  setLocalStorage (key, value) {
    localStorage.setItem(key, value)
  },
  getLocalStorage (key) {
    return localStorage.getItem(key)
  },
  loginOut (key) {
    localStorage.removeItem(key)
  }
}

export default storage
