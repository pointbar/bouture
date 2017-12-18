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

describe(`Bouture.div('yo')`, () => {
  it(`should create a div with text 'yo'`, () => {
    const bdiv = Bouture.div('yo')

    expect(bdiv.getElement()).to.be.an.instanceof(HTMLElement)
    expect(bdiv.getElement().textContent).to.equal('yo')
  })
})

describe('Bouture.a', () => {
  it('should create a <a>', () => {
    const a = Bouture.a

    expect(a.getElement()).to.be.an.instanceof(HTMLAnchorElement)
  })
})

describe('Bouture.h1', () => {
  it('should create a <h1>', () => {
    const h1 = Bouture.h1

    expect(h1.getElement()).to.be.an.instanceof(HTMLHeadingElement)
  })
})

describe('Bouture.bloublou', () => {
  it('should return undefined', () => {
    const bloublou = Bouture.bloublou

    expect(bloublou).to.be.undefined
  })
})
