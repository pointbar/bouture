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

describe('Bouture.div({lang: "fr"})', () => {
  it('should create a div with a lang attribute', () => {
    const bdiv = Bouture.div({lang: 'fr'})

    expect(bdiv.getElement().getAttribute('lang')).to.equal('fr')
  })
})

describe('Bouture.div({hidden: true})', () => {
  it('should create a div with a hidden attribute set to the empty string', () => {
    const bdiv = Bouture.div({hidden: true})

    expect(bdiv.getElement().getAttribute('hidden')).to.equal('')
  })
})

describe('Bouture.div({hidden: false})', () => {
  it('should create a div with no hidden attribute', () => {
    const bdiv = Bouture.div({hidden: true})

    expect(bdiv.getElement().hasAttribute('hidden')).to.be.false
  })
})

describe(`Bouture.div({'data-bloublou': 'yoya'})`, () => {
  it('should create a div with a data attribute', () => {
    const bdiv = Bouture.div({'data-bloublou': 'yoya'})

    expect(bdiv.getElement().getAttribute('data-bloublou')).to.equal('yoya')
    expect(bdiv.getElement().dataset.bloublou).to.equal('yoya')
  })
})

describe(`Bouture.div({class: ['yo', 'ya']})`, () => {
  it('should create a div with 2 classes', () => {
    const bdiv = Bouture.div({class: ['yo', 'ya']})

    expect(bdiv.getElement().classList.has('yo')).to.be.true
    expect(bdiv.getElement().classList.has('ya')).to.be.true
    expect(bdiv.getElement().classList.length).to.equal(2)
    expect(bdiv.getElement().getAttribute('class')).to.equal('yo ya')
  })
})

describe(`Bouture.div({class: ['yo', undefined]})`, () => {
  it('should create a div with 1 class', () => {
    const bdiv = Bouture.div({class: ['yo', undefined]})

    expect(bdiv.getElement().classList.has('yo')).to.be.true
    expect(bdiv.getElement().classList.length).to.equal(1)
  })
})
