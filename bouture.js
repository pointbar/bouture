const Bouture = {}

;['h1', 'h2', 'a', 'input', 'iframe', 'img', 'div'].forEach(name => {
  Object.defineProperty(Bouture, name, {
    get: () => {
      const element = document.createElement(name)
      function branche (text) {
        element.append(text)
        return branche
      }
      branche.getElement = () => {
        return element
      }
      return branche
    }
  })
})

export default Bouture
