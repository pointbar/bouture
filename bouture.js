export default {
  get div () {
    const div = document.createElement('div')
    return {
      getElement: () => div
    }
  }
}
