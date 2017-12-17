
export default {
  get div () {
    const div = document.createElement('div')
    function branche (text) {
      div.append(text)
      return branche
    }
    branche.getElement = () => {
      return div
    }
    return branche
  }
}
