const Bouture = {}
const tagNames = new Set(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'])

tagNames.forEach(tag => {
  Object.defineProperty(Bouture, tag, {
    get: () => {
      const element = document.createElement(tag)
      function branche (...args) {
        const append = {
          string: (element, text) => element.append(text),
          object: (element, attributes) => Object.keys(attributes)
            .forEach(attribute => {
              (() => {
                return {
                  boolean: () => {
                    if (!!attributes[attribute]) { 
                      element.setAttribute(attribute, '')
                    } else if (element.hasAttribute(attribute)) {
                      element.removeAttribute(attribute)
                    }
                  },
                  string: () => element.setAttribute(attribute, attributes[attribute]),
                  object: () => element.setAttribute(attribute, attributes[attribute].join(' '))
                }
              })()[typeof attributes[attribute]]()
            })
        }
        args.forEach(arg => append[typeof arg](element, arg))
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
