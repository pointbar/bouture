const protoDiv = (text) => {
  const div = document.createElement('div')
  div.append(text)
  return {
    getElement: () => {
      return div
    }
  }
}

const handler = {
  apply: (target, thisArg, args) => {
    return target(args[0])
  },
  get: (target, propKey, receiver) => {
    const origMethod = target()[propKey]
    if (typeof propKey === 'symbol') {
      return target()
    }
    return function (...args) {
      try {
        return origMethod.apply(this, args)
      } catch (e) {}
    }
  }
}

export default {
  get div () { return new Proxy(protoDiv, handler) }
}
