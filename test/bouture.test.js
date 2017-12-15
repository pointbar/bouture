import Bouture from '../bouture.js'

describe('Bouture.div', () => {
  it('should create an object', () => {
    expect(Bouture.div).to.be.an('object')
  })
})

describe('Bouture.div.getElement()', () => {
  it('should return an actual DOM node', () => {
    const b = Bouture.div.getElement()

    expect(b).to.be.an(HTMLElement)
  })
})
