import {expect} from 'chai'
import Bouture from '../bouture.js'

describe('Bouture.div', () => {
  it('should create an object', () => {
    const b = Bouture.div
    expect(Object(b)).to.equal(b)
  })
  it('should create a new element on each access', () => {
    expect(Bouture.div).to.not.equal(Bouture.div)
  })
})

describe('Bouture.div.getElement()', () => {
  it('should return an actual DOM node', () => {
    const b = Bouture.div.getElement()
    expect(b).to.be.an.instanceof(HTMLElement)
  })
})
